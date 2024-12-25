import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { z } from 'zod';
import { ZodValidatorPipe } from '@/infra/http/pipes/zod-validation.pipe';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';

const editAnswerBodySchema = z.object({
  content: z.string(),
});

export type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>;

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(
    private jwt: JwtService,
    private editAnswer: EditAnswerUseCase
  ) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidatorPipe(editAnswerBodySchema))
    body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string
  ) {
    const { content } = body;
    const { sub: userId } = user;

    const result = await this.editAnswer.execute({
      answerId,
      content,
      authorId: userId.toString(),
      attachmentsIds: [],
    });
    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
