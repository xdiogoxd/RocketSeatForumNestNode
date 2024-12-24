import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment.mapper';

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const result = await this.prisma.attachment.findMany({
      where: {
        answerId: answerId,
      },
    });
    return result.map(PrismaAnswerAttachmentMapper.toDomain);
  }
  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const result = await this.prisma.attachment.findMany({
      where: {
        answerId: answerId,
      },
    });
    if (!result) {
      throw new Error();
    }

    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    });
  }
}
