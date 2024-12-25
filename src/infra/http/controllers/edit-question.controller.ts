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
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>;

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(
    private jwt: JwtService,
    private editQuestion: EditQuestionUseCase
  ) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidatorPipe(editQuestionBodySchema))
    body: EditQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string
  ) {
    const { title, content } = body;
    const { sub: userId } = user;

    const result = await this.editQuestion.execute({
      questionId,
      title,
      content,
      authorId: userId.toString(),
      attachmentsIds: [],
    });
    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
