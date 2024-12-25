import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification';

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id
  );

  return notification;
}

// @Injectable()
// export class QuestionFactory {
//   constructor(private prisma: PrismaService) {}

//   async makePrismaQuestion(
//     data: Partial<NotificationProps> = {}
//   ): Promise<Notification> {
//     const question = makeNotification(data);

//     await this.prisma.comment.create({
//       data: PrismaQuestionAttachmentMapper.toPrismaFormat(question),
//     });

//     return question;
//   }
// }
