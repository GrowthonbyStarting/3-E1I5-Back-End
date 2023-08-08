import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ImagesService } from 'src/image/images.service';
import { UpdateProfileBodyDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService, private readonly imagesService: ImagesService) {}

  async update({ id, data, file }: { id: number; data: UpdateProfileBodyDto; file: Express.Multer.File }) {
    const profileImage = await this.imagesService.create(file);
    const profile = await this.prisma.profile.update({
      where: { id },
      data: {
        name: data.name,
        image: { connect: { id: profileImage.id } },
        description: data.description,
        // tabs: data.tabs && {
        //   upsert: data.tabs.map((tab) => ({
        //     where: { profileId_type: { profileId: id, type: tab.type } },
        //     create: {
        //       title: tab.title,
        //       type: tab.type,
        //       info: tab.info,
        //     },
        //     update: {
        //       title: tab.title,
        //       type: tab.type,
        //       info: tab.info,
        //     },
        //   })),
        // },
      },
    });
    return profile;
  }

  async retrieve({ url }: { url: string }) {
    return this.prisma.profile.findUnique({
      where: { url },
      include: { tabs: true, image: true },
    });
  }
}
