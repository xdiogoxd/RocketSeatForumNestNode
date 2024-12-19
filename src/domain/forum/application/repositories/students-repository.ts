import { Student } from '@/domain/forum/enterprise/entities/student';

export abstract class StudentsRepository {
  abstract findById(id: string): Promise<Student | null>;
  abstract findByEmail(slug: string): Promise<Student | null>;
  abstract save(student: Student): Promise<void>;
  abstract create(student: Student): Promise<void>;
  abstract delete(student: Student): Promise<void>;
}
