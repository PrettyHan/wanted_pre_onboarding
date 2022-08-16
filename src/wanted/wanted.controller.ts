import { Body, Controller, Post } from '@nestjs/common';
import { CreateWantedDto } from './dto';
import { Wanted } from './interface/wanted.interface';
import { WantedService } from './wanted.service';

@Controller('wanted')
export class WantedController {
  constructor(private readonly wantedService: WantedService) {}

  @Post()
  async create(@Body() new_wanted: CreateWantedDto) {
    return this.wantedService.create(new_wanted);
  }
}
