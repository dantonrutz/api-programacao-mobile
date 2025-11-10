// src/classroom/classroom.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Injectable()
export class ClassroomService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateClassroomDto) {
        const data: any = {
            name: dto.name,
            code: dto.code,
            teacherId: dto.teacherId,
        };
        if (dto.studentIds && dto.studentIds.length) {
            data.students = { connect: dto.studentIds.map(id => ({ id })) };
        }
        return this.prisma.classroom.create({
            data,
            include: { teacher: true, students: true, exercises: true, rankings: true },
        });
    }

    async findAll() {
        return this.prisma.classroom.findMany({ include: { teacher: true, students: true, exercises: true, rankings: true } });
    }

    async findOne(id: string) {
        const classroom = await this.prisma.classroom.findUnique({
            where: { id },
            include: { teacher: true, students: true, exercises: true, rankings: true },
        });
        if (!classroom) throw new NotFoundException('Classroom not found');
        return classroom;
    }

    async update(id: string, dto: UpdateClassroomDto) {
        const data: any = {};
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.code !== undefined) data.code = dto.code;
        if (dto.teacherId !== undefined) data.teacherId = dto.teacherId;
        if (dto.studentIds !== undefined) {
            // replace students relation
            data.students = { set: dto.studentIds.map(sid => ({ id: sid })) };
        }
        return this.prisma.classroom.update({
            where: { id },
            data,
            include: { teacher: true, students: true, exercises: true, rankings: true },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.classroom.delete({ where: { id } });
    }
}
