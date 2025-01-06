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

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const ids = attachments.map((attachment) => {
      return attachment.id.toString();
    });

    const QuestionId = attachments[0].answerId.toString();

    await this.prisma.attachment.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        answerId: QuestionId,
      },
    });
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const ids = attachments.map((attachment) => {
      return attachment.id.toString();
    });

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
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
