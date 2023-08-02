import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TabService } from './tab.service';

@Controller('/tabs')
@ApiTags('Tab')
export class TabController {
  constructor(private readonly tabService: TabService) {}

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.tabService.delete({ id: Number(id) });
  }
}
