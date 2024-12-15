import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repostiory';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repostiory';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repostiory';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repostiory';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repostiory';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';

@Module({
  providers: [
    PrismaService,
    PrismaQuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    PrismaQuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
})
export class DataBaseModule {}
