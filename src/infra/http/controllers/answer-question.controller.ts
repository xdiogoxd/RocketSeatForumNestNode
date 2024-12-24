import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { z } from 'zod';
import { ZodValidatorPipe } from '@/infra/http/pipes/zod-validation.pipe';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';

const answerQuestionBodySchema = z.object({
  content: z.string(),
});

export type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>;

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(
    private jwt: JwtService,
    private answerQuestion: AnswerQuestionUseCase
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidatorPipe(answerQuestionBodySchema))
    body: AnswerQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string
  ) {
    const { content } = body;
    const { sub: userId } = user;

    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId: userId.toString(),
      attachmentsIds: [],
    });
    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
