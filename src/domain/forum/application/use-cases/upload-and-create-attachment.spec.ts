import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment';
import { FakeUploader } from 'test/storage/fakeUploader';
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type-error';

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let fakeUploader: FakeUploader;
let sut: UploadAndCreateAttachmentUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    fakeUploader = new FakeUploader();

    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader
    );
  });

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    });
    expect(fakeUploader.uploads).toHaveLength(1);
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      })
    );
  });
  it('should not be able to upload a file with a unsupported extention', async () => {
    const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'audio/mp3',
      body: Buffer.from(''),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError);
  });
});
