import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { PrimsaStudentsRepository } from './prisma/repositories/prisma-student-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrimsaStudentsRepository,
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
  ],
})
export class DatabaseModule {}
