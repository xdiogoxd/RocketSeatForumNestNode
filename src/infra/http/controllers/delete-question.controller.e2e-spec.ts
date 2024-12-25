import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { AppModule } from '@/infra/app.module';
import { DataBaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { QuestionFactory } from 'test/factories/make-question';
import { StudentFactory } from 'test/factories/make-student';

describe('Delete question (E2E)', () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DataBaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });
  test('[DELETE] /questions', async () => {
    const user = await studentFactory.makePrismaStudent();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
      slug: Slug.create('question01'),
    });

    const questionId = question.id.toString();

    const response = await request(app.getHttpServer())
      .delete(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({});
    expect(response.statusCode).toBe(204);

    const questionOnDatabase = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    expect(questionOnDatabase).toBeNull();
  });
});
