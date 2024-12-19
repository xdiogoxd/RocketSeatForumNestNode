import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { FakeHasher } from 'test/cryptography.ts/fake-hasher';
import { AuthenticateStudentUseCase } from './authenticate-student';
import { FakeEncryptor } from 'test/cryptography.ts/fake-encryptor';
import { makeStudent } from 'test/factories/make-student';
import { string } from 'zod';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let fakeEncryptor: FakeEncryptor;
let sut: AuthenticateStudentUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    fakeEncryptor = new FakeEncryptor();
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncryptor
    );
  });

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'johndoe@test.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryStudentsRepository.items.push(student);

    const result = await sut.execute({
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
  it('should not be able to login with a invalid password', async () => {
    const student = makeStudent({
      email: 'johndoe@test.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryStudentsRepository.items.push(student);

    const result = await sut.execute({
      email: 'johndoe@test.com',
      password: '1234567',
    });

    expect(result.isLeft()).toBe(true);
  });
});
