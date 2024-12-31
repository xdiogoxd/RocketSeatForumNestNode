import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAttachmentsMapper } from '../mappers/prisma-attachment-mapper';

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Attachment | null> {
    const attachment = await this.prisma.attachment.findUnique({
      where: {
        id,
      },
    });

    if (!attachment) {
      return null;
    }

    return PrismaAttachmentsMapper.toDomain(attachment);
  }

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentsMapper.toPrismaFormat(attachment);

    await this.prisma.attachment.create({
      data,
    });
  }
  async delete(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentsMapper.toPrismaFormat(attachment);

    await this.prisma.attachment.delete({
      where: {
        id: data.id,
      },
    });
  }
}
