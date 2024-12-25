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
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
});

export type CommentOnQuestionBodySchema = z.infer<
  typeof commentOnQuestionBodySchema
>;

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(
    private jwt: JwtService,
    private commentOnQuestion: CommentOnQuestionUseCase
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidatorPipe(commentOnQuestionBodySchema))
    body: CommentOnQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string
  ) {
    const { content } = body;
    const { sub: userId } = user;

    const result = await this.commentOnQuestion.execute({
      content,
      questionId,
      authorId: userId.toString(),
    });
    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
