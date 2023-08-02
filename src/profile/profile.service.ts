import { Injectable } from '@nestjs/common';
import { PrismaService } from '../libs/orm';
import { UpdateProfileBodyDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async update({ id, data }: { id: number; data: UpdateProfileBodyDto }) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.profile.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          tabs: data.tabs && {
            upsert: data.tabs.map((tab) => ({
              where: { profileId_type: { profileId: id, type: tab.type } },
              create: {
                title: tab.title,
                type: tab.type,
                info: tab.info,
              },
              update: {
                title: tab.title,
                type: tab.type,
                info: tab.info,
              },
            })),
          },
        },
      });
    });
  }

  async retrieve({ url }: { url: string }) {
    return this.prisma.profile.findUnique({
      where: { url },
      include: { tabs: true },
    });
  }
}
