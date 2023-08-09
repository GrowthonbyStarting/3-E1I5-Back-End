import { profile } from 'console';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TabService } from './tab.service';
import { TabDto } from './tab.dto';

@Controller('/tabs')
@ApiTags('Tab')
export class TabController {
  constructor(private readonly tabService: TabService) {}

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.tabService.delete({ id: Number(id) });
  }

  @Patch('/:id')
  @ApiOperation({
    summary: '유저 tab정보 API',
    description: '유저 tab정보를 update합니다.',
  })
  async update(@Body() tabs: TabDto[], @Param('id') id: number) {
    return this.tabService.updateProfileTabs(tabs, +id);
  }
}
