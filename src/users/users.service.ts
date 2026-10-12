import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.client.orm.public.User.where({
      email: email.trim().toLowerCase(),
    }).first();
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    passwordHash: string;
  }) {
    return this.prisma.client.orm.public.User.create({
      ...data,
      email: data.email.trim().toLowerCase(),
    });
  }
}
