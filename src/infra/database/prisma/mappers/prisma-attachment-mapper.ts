import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';

import { Attachment as PrismaAttachment, Prisma } from '@prisma/client';

export class PrismaAttachmentsMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityID(raw.id)
    );
  }
  static toPrismaFormat(
    attachment: Attachment
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      title: attachment.title,
      url: attachment.link,
    };
  }
}
