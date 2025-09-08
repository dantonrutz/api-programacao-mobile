import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchUserDTO } from './dto';
import { User } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserPartialProfile(user: User) {
    return {
      name: user.name,
      email: user.email,
      roles: user.roles,
      image: user.image,
    }
  }
}
