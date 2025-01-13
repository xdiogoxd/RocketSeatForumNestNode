import {
  Question as PrismaQuestion,
  User as PrismaUser,
  Attachment as PrismaAttachment,
} from '@prisma/client';
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { PrismaAttachmentMapper } from './prisma-attachment-mapper';

type PrismaQuestionDetails = PrismaQuestion & {
  author: PrismaUser;
  attachments: PrismaAttachment[];
};

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionDetails): QuestionDetails {
    return QuestionDetails.create({
      questionId: raw.id,
      title: raw.title,
      slug: Slug.create(raw.slug),
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      bestAnswerId: raw.bestAnswerId ? raw.bestAnswerId : null,
      author: raw.author.name,
      authorId: raw.author.id,
      attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
    });
  }
}
