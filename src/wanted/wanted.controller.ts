import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateWantedDto, UpdateWantedDto } from './dto';
import { wantedEntity } from './entity/wanted.entity';
import { WantedService } from './wanted.service';

@ApiTags('채용공고 API')
@Controller('wanted')
export class WantedController {
  constructor(private readonly wantedService: WantedService) {}

  @ApiOperation({
    summary: '채용공고 검색 API',
    description: '채용공고 검색',
  })
  @ApiQuery({ name: 'search', required: false })
  @ApiOkResponse({
    status: 200,
    type: wantedEntity,
  })
  @Get('search')
  async search(@Query('search') search: string) {
    return await this.wantedService.search(search);
  }

  @ApiOperation({
    summary: '채용공고 생성 API',
    description: '채용공고 생성',
  })
  @ApiBody({ type: CreateWantedDto })
  @ApiCreatedResponse({ description: '채용공고 생성', type: wantedEntity })
  @Post()
  async create(@Body() new_wanted: CreateWantedDto) {
    return this.wantedService.create(new_wanted);
  }

  @ApiOperation({
    summary: '모든 채용공고 리스트 불러오기 API',
    description: '채용공고 리스트 불러옴',
  })
  @ApiOkResponse({
    status: 200,
    isArray: true,
    type: wantedEntity,
  })
  @Get('list')
  async findAll() {
    return await this.wantedService.findAll();
  }

  @ApiOperation({
    summary: '채용공고 상세 페이지 불러오기 API',
    description: '채용공고 id 받고 해당 채용공고 불러옴',
  })
  @ApiOkResponse({ type: wantedEntity })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.wantedService.findOne(id);
  }

  @ApiOperation({
    summary: '채용공고 수정 API',
    description: '채용공고 id 받고 해당 채용공고 수정함',
  })
  @ApiCreatedResponse({ type: wantedEntity })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Patch(':id')
  async patch(@Param('id') id: number, @Body() updateData: UpdateWantedDto) {
    return await this.wantedService.update(id, updateData);
  }

  @ApiOperation({
    summary: '채용공고 삭제 API',
    description: '채용공고 id 받고 해당 채용공고 삭제함',
  })
  @ApiNoContentResponse({ description: '삭제' })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.wantedService.remove(id);
  }
}
