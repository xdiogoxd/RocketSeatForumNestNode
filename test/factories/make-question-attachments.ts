import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
// import { PrismaQuestionAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-question-attachment.mapper';
// import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      id: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return questionAttachment;
}

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionAttachment(
    data: Partial<QuestionAttachmentProps> = {}
  ): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttachment(data);

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.id.toString(),
      },
      data: {
        questionId: questionAttachment.questionId.toString(),
      },
    });

    return questionAttachment;
  }
}
