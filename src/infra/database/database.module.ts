import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repostiory';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repostiory';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repostiory';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repostiory';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repostiory';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
})
export class DataBaseModule {}
