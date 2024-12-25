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
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';

const commentOnAnswerBodySchema = z.object({
  content: z.string(),
});

export type CommentOnAnswerBodySchema = z.infer<
  typeof commentOnAnswerBodySchema
>;

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(
    private jwt: JwtService,
    private commentOnAnswer: CommentOnAnswerUseCase
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidatorPipe(commentOnAnswerBodySchema))
    body: CommentOnAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string
  ) {
    const { content } = body;
    const { sub: userId } = user;

    const result = await this.commentOnAnswer.execute({
      content,
      answerId,
      authorId: userId.toString(),
    });
    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
