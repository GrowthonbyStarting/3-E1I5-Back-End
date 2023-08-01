import { Injectable } from '@nestjs/common';
import { PrismaService } from '../libs/orm';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
}
