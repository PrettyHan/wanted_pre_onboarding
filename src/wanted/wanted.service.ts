import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<wantedEntity[]> {
    return await this.wantedRepository.find();
  }

  async findOne(id: number): Promise<wantedEntity> {
    let result: wantedEntity = null;

    result = await this.wantedRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException(`해당 정보를 찾을 수 없습니다.`);
    }

    return result;
  }

  async create(new_wanted: CreateWantedDto): Promise<void> {
    await this.wantedRepository.save(new_wanted);
  }

  async remove(id: number): Promise<void> {
    await this.wantedRepository.delete(id);
  }

  async update(id: number, updateData: UpdateWantedDto): Promise<void> {
    await this.wantedRepository.update(id, updateData);
  }
}
