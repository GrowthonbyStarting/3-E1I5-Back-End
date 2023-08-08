import { Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { TabDto } from './tab.dto';

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

  // async update({ id, tabDto }: { id: number; tabDto: TabDto[] }) {
  //   const tabUpdate = await this.prisma.tab.upsert({
  //     where: { profileId_type: { profileId: id, type: tabDto.type } },
  //     create: {},
  //     update: undefined,
  //   });
  //   console.log(tabUpdate);
  // }

  // async upsertTabs(profileId: number, tabs: TabDto[]) {
  //   return Promise.all(
  //     tabs.map(async (tab) => {
  //       return this.prisma.tab.upsert({
  //         where: { profileId_type: { profileId, type: tab.type } },
  //         create: {
  //           title: tab.title,
  //           type: tab.type,
  //           info: tab.info,
  //         },
  //         update: {
  //           title: tab.title,
  //           type: tab.type,
  //           info: tab.info,
  //         },
  //       });
  //     }),
  //   );
  // }

  // updateProfileTabs = async (id: number, tabs: TabDto[]) => {
  //   const profileTabs = tabs.map((tab) => ({
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
  //   }));

  //   await this.prisma.profile.update({
  //     where: { id },
  //     data: { tabs: { upsert: profileTabs } },
  //   });
  // };

  async updateProfileTabs(tabs: TabDto[], id: number) {
    console.log(typeof id);

    const profileTabs = {
      upsert: tabs.map((tab) => ({
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
    };

    await this.prisma.profile.update({
      where: { id },
      data: { tabs: profileTabs },
    });
    return profileTabs;
  }
}
