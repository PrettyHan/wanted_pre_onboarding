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

  async findOne(id: number): Promise<wantedEntity> {
    const found = await this.wantedRepository.findOne({
      where: { id: id },
      relations: ['company'],
      select: ['id', 'position', 'reward', 'content', 'skill', 'company_id'],
    });

    if (!found) {
      throw new NotFoundException(`해당 정보가 없습니다.`);
    }

    const found2 = await this.wantedRepository.find({
      where: { company_id: found.company_id },
      select: ['id'],
    });
    const otherWanted = found2.map((v) => {
      return v.id;
    });

    return { ...found, otherWanted };
  }

  async findAll(): Promise<wantedEntity[]> {
    const found = await this.wantedRepository.find({
      relations: ['company'],
      select: ['id', 'position', 'reward', 'skill', 'company'],
    });

    if (!found) {
      throw new NotFoundException(`해당 정보가 없습니다.`);
    }
    return found;
  }

  async search(search: string): Promise<wantedEntity[]> {
    const found = await this.wantedRepository
      .createQueryBuilder('wanted')
      .leftJoinAndSelect('wanted.company', 'company')
      .where('wanted.position like :search', { search: `%${search || ''}%` })
      .orWhere('wanted.skill like :search', { search: `%${search || ''}%` })
      .orWhere('company.name like :search', { search: `%${search || ''}%` })
      .orWhere('company.country like :search', { search: `%${search || ''}%` })
      .orWhere('company.region like :search', { search: `%${search || ''}%` })
      .getMany();

    if (!found) {
      throw new NotFoundException(`해당 정보가 없습니다.`);
    }

    return found;
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
