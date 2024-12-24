import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment.mapper';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findFirst({
      where: {
        id,
      },
    });

    if (!answerComment) {
      return null;
    }

    return PrismaAnswerCommentMapper.toDomain(answerComment);
  }
  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ): Promise<AnswerComment[]> {
    const answerComments = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return answerComments.map(PrismaAnswerCommentMapper.toDomain);
  }
  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrismaFormat(answerComment);

    await this.prisma.comment.create({
      data,
    });
  }
  async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: answerComment.id.toString(),
      },
    });
  }
}
