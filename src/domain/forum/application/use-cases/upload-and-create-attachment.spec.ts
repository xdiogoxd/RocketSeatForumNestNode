import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { RegisterStudentUseCase } from './register-student';
import { FakeHasher } from 'test/cryptography.ts/fake-hasher';
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment';

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let fakeHasher: FakeHasher;
let sut: RegisterStudentUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    fakeHasher = new FakeHasher();
    sut = new UploadAndCreateAttachmentUseCase(inMemoryAttachmentsRepository, );
  });

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      student: inMemoryAttachmentsRepository.items[0],
    });
  });
  it('should be able to hash student password', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAttachmentsRepository.items[0].password).toEqual(
      '123456-hashed'
    );
  });
});
