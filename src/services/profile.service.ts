import { Injectable } from '@nestjs/common';
import { RegisterProfileDto } from '../dto';
import { PrismaService } from '../libs/orm';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async register({ userId, data }: { userId: number; data: RegisterProfileDto }) {
    return this.prisma.profile.create({
      data: {
        name: data.name,
        description: data.description ?? '',
        url: data.url,
        userId,
      },
    });
  }
}
