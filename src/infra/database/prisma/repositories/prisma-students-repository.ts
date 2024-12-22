import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { Student } from '@/domain/forum/enterprise/entities/student';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-student.mapper';

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return null;
    }

    return PrismaUserMapper.toDomain(student);
  }
  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!student) {
      return null;
    }

    return PrismaUserMapper.toDomain(student);
  }

  async save(student: Student): Promise<void> {
    const data = PrismaUserMapper.toPrismaFormat(student);

    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
  async create(student: Student): Promise<void> {
    const data = PrismaUserMapper.toPrismaFormat(student);

    await this.prisma.user.create({
      data,
    });
  }
  async delete(student: Student): Promise<void> {
    const data = PrismaUserMapper.toPrismaFormat(student);

    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    });
  }
}
