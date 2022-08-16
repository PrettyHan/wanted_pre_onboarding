import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { wantedEntity } from './entity/wanted.entity';
import { WantedModule } from './wanted.module';
import { WantedService } from './wanted.service';

class MockRepository {
  async findOne(id) {
    const wanted: wantedEntity = new wantedEntity();
    wanted.id = id;
    return wanted;
  }
}

describe('WantedService', () => {
  let service: WantedService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WantedService,
        {
          provide: getRepositoryToken(wantedEntity),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<WantedService>(WantedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    it('param 값 동일 해야 됨', async () => {
      const id = 1;
      const result = await service.findOne(id);
      expect(result.id).toBe(id);
    });
    it('결과값 없음, 그에 따른 에러 나타내는지 확인', async () => {
      const id = 100;

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });
});
