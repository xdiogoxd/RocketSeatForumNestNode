import { ConflictException, UsePipes } from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { ZodValidatorPipe } from '@/infra/http/pipes/zod-validation.pipe';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { z } from 'zod';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidatorPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, password, email } = createAccountBodySchema.parse(body);

    const userWithSameEmail = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException('Email not available');
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
