import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { z } from 'zod';
import { ZodValidatorPipe } from '@/infra/http/pipes/zod-validation.pipe';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private jwt: JwtService,
    private createQuestion: CreateQuestionUseCase
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidatorPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload
  ) {
    const { title, content } = body;
    const { sub: userId } = user;

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId.toString(),
      attachmentsIds: [],
    });
  }
}
