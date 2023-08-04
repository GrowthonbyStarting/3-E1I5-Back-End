import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TabService {
  constructor(private readonly prisma: PrismaService) {}

  async delete({ id }: { id: number }) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.tab.delete({
        where: { id },
      });
    });
  }
}
