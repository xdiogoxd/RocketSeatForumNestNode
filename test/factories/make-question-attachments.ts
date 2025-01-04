import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment';
// import { PrismaQuestionAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-question-attachment.mapper';
// import { PrismaService } from '@/infra/database/prisma/prisma.service';
// import { Injectable } from '@nestjs/common';

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

// @Injectable()
// export class QuestionFactory {
//   constructor(private prisma: PrismaService) {}

//   async makePrismaQuestion(
//     data: Partial<QuestionAttachmentProps> = {}
//   ): Promise<QuestionAttachment> {
//     const question = makeQuestionAttachment(data);

//     await this.prisma.attachment.create({
//       data: PrismaQuestionAttachmentMapper.toPrismaFormat(question),
//     });

//     return question;
//   }
// }
