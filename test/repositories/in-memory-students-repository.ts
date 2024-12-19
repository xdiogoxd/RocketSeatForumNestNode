import { DomainEvents } from '@/core/events/domain-events';
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { Student } from '@/domain/forum/enterprise/entities/student';

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = [];

  async findById(id: string) {
    const student = this.items.find((item) => item.id.toString() === id);

    if (!student) {
      return null;
    }

    return student;
  }

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email.toString() === email);

    if (!student) {
      return null;
    }

    return student;
  }

  async create(student: Student) {
    this.items.push(student);

    DomainEvents.dispatchEventsForAggregate(student.id);
  }

  async save(student: Student) {
    const itemIndex = this.items.findIndex((item) => item.id === student.id);

    this.items[itemIndex] = student;

    DomainEvents.dispatchEventsForAggregate(student.id);
  }

  async delete(student: Student) {
    const itemIndex = this.items.findIndex((item) => item.id === student.id);

    this.items.splice(itemIndex, 1);
  }
}
