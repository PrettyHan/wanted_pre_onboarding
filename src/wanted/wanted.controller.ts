import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
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
  async findOne(@Param('id') id: number) {
    console.log(id);
    return await this.wantedService.findOne(id);
  }

  @Patch(':id')
  async patch(@Param('id') id: number, @Body() updateData: UpdateWantedDto) {
    return await this.wantedService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.wantedService.remove(id);
  }
}
