import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { createApplicationDto } from './dto/create.application.dto';
import { applicationEntity } from './entity/application.entity';

@ApiTags('지원내역 API')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationSerivce: ApplicationService) {}

  @ApiOperation({
    summary: '지원내역 생성 API',
    description: '지원내역 생성',
  })
  @ApiBody({ type: createApplicationDto })
  @ApiCreatedResponse({ description: '지원내역 생성', type: applicationEntity })
  @Post()
  async create(@Body() new_application: createApplicationDto) {
    return this.applicationSerivce.create(new_application);
  }

  @ApiOperation({
    summary: '지원내역 상세 페이지 불러오기 API',
    description:
      '지원내역 id 받고 해당 지원한 유저의 정보와 채용공고 정보 불러옴',
  })
  @ApiOkResponse({ type: applicationEntity })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.applicationSerivce.findOne(id);
  }
}
