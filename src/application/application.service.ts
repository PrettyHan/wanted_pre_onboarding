import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createApplicationDto } from './dto/create.application.dto';
import { applicationEntity } from './entity/application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(applicationEntity)
    private applicationRepository: Repository<applicationEntity>,
  ) {}

  async create(new_application: createApplicationDto): Promise<void> {
    const { user_id, wanted_id } = new_application;
    const found = this.applicationRepository
      .createQueryBuilder()
      .where('user_id = :user_id', { user_id })
      .andWhere('wanted_id = :wanted_id', { wanted_id });

    if (found) {
      throw new NotAcceptableException('이미 지원한 채용공고 입니다.');
    }

    await this.applicationRepository.save(new_application);
  }

  async findOne(id: number): Promise<applicationEntity> {
    const found = await this.applicationRepository.findOne({
      where: { id: id },
      relations: ['user', 'wanted'],
    });

    if (!found) {
      throw new NotFoundException(`해당 정보가 없습니다.`);
    }

    return found;
  }
}
