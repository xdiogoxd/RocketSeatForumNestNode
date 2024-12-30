import { DomainEvents } from '@/core/events/domain-events';
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = [];

  async findById(id: string) {
    const attachment = this.items.find((item) => item.id.toString() === id);

    if (!attachment) {
      return null;
    }

    return attachment;
  }

  async create(attachment: Attachment) {
    this.items.push(attachment);

    DomainEvents.dispatchEventsForAggregate(attachment.id);
  }

  async delete(attachment: Attachment) {
    const itemIndex = this.items.findIndex((item) => item.id === attachment.id);

    this.items.splice(itemIndex, 1);
  }
}
