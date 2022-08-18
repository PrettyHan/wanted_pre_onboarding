import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { wantedEntity } from './entity/wanted.entity';
import { Repository } from 'typeorm';
import { CreateWantedDto, UpdateWantedDto } from './dto';

@Injectable()
export class WantedService {
  constructor(
    @InjectRepository(wantedEntity)
    private wantedRepository: Repository<wantedEntity>,
  ) {}

  async findOne(id: number): Promise<wantedEntity> {
    const found = await this.wantedRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`해당 정보가 없습니다.`);
    }
    return found;
  }

  async findAll(): Promise<wantedEntity[]> {
    return await this.wantedRepository.find();
  }

  async create(new_wanted: CreateWantedDto): Promise<void> {
    await this.wantedRepository.save(new_wanted);
  }

  async remove(id: number): Promise<void> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException('해당 정보가 없습니다.');
    }
    await this.wantedRepository.delete(id);
  }

  async update(id: number, updateData: UpdateWantedDto): Promise<void> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException('해당 정보가 없습니다.');
    }
    await this.wantedRepository.update(id, updateData);
  }
}
