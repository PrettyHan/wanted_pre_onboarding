import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { wantedEntity } from './entity/wanted.entity';
import { Repository } from 'typeorm';
import { CreateWantedDto } from './dto';

@Injectable()
export class WantedService {
  constructor(
    @InjectRepository(wantedEntity)
    private wantedRepository: Repository<wantedEntity>,
  ) {}
  async findAll(): Promise<wantedEntity[]> {
    return this.wantedRepository.find();
  }

  async findOne(id: number): Promise<wantedEntity> {
    return this.wantedRepository.findOne({ where: { id: id } });
  }

  async create(new_wanted: CreateWantedDto): Promise<void> {
    await this.wantedRepository.save(new_wanted);
  }

  async remove(id: number): Promise<void> {
    await this.wantedRepository.delete(id);
  }
}
