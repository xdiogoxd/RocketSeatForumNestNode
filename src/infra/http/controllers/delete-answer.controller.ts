import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer';

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(
    private jwt: JwtService,
    private deleteAnswer: DeleteAnswerUseCase
  ) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string
  ) {
    const { sub: userId } = user;

    const result = await this.deleteAnswer.execute({
      answerId,
      authorId: userId,
    });
    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
