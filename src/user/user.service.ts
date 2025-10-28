import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchUserDTO } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUserPartialProfile(user: User) {
    return {
      name: user.name,
      email: user.email,
      roles: user.roles,
    }
  }
  private omitPassword(user: any) {
    if (!user) return user;
    const { password, ...rest } = user;
    return rest;
  }

  async create(data: CreateUserDto) {
    const hashed = await bcrypt.hash(data.password, 10);
    const { roles, ...rest } = data;
    const user = await this.prisma.user.create({
      data: {
        ...rest,
        password: hashed,
        roles: roles as RoleEnum[],
      },
      include: {
        classrooms: true,
        teaching: true,
        exercises: true,
        answers: true,
        progress: true,
        rankings: true,
        notifications: true,
      },
    });
    return this.omitPassword(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        classrooms: true,
        teaching: true,
        exercises: true,
        answers: true,
        progress: true,
        rankings: true,
        notifications: true,
      },
    });
    return users.map(u => this.omitPassword(u));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        classrooms: true,
        teaching: true,
        exercises: true,
        answers: true,
        progress: true,
        rankings: true,
        notifications: true,
      },
    });
    // if (!user) throw new Exception('User not found');
    return this.omitPassword(user);
  }

  async update(id: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const { roles, ...rest } = data;
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        roles: roles as RoleEnum[],
      },
      include: {
        classrooms: true,
        teaching: true,
        exercises: true,
        answers: true,
        progress: true,
        rankings: true,
        notifications: true,
      },
    });
    return this.omitPassword(user);
  }

  async remove(id: string) {
    await this.findOne(id); // lança NotFound se não existir
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return this.omitPassword(user);
  }
}
