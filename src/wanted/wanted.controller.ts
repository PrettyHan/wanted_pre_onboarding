import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { CreateWantedDto, UpdateWantedDto } from './dto';
import { WantedService } from './wanted.service';

@Controller('wanted')
export class WantedController {
  constructor(private readonly wantedService: WantedService) {}

  @Post()
  async create(@Body() new_wanted: CreateWantedDto) {
    return this.wantedService.create(new_wanted);
  }

  @Get('list')
  async findAll() {
    return await this.wantedService.findAll();
  }
  @Get(':id')
  async findOne(@Param() id: number) {
    return await this.wantedService.findOne(id);
  }

  @Patch(':id')
  async patch(@Param() id: number, @Body() updateData: UpdateWantedDto) {
    return await this.wantedService.update(id, updateData);
  }
}
