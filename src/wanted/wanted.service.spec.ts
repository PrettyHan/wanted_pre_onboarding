import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { wantedEntity } from './entity/wanted.entity';
import { WantedService } from './wanted.service';
import { Repository } from 'typeorm';

const mockRepository = () => ({
  save: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
// Partial : 타입 T의 모든 요소를 optional하게 한다.
// Record : 타입 T의 모든 K의 집합으로 타입을 만들어준다.
// keyof Repository<T> : Repository의 모든 method key를 불러온다.
// jest.Mock : 3번의 key들을 다 가짜로 만들어준다.
// type MockRepository<T = any> : 이를 type으로 정의해준다.

describe('WantedService', () => {
  let service: WantedService;
  let repository: MockRepository<wantedEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WantedService,
        {
          provide: getRepositoryToken(wantedEntity),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<WantedService>(WantedService);
    repository = module.get(getRepositoryToken(wantedEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    it('요청 받은 값 == return 값 확인', async () => {
      const id = 1;
      const test_data = {
        id: 1,
        position: 'test',
        reward: 10000,
        content: 'test',
        skill: 'test',
      };
      repository.findOne.mockReturnValue(test_data);

      const result = await service.findOne(id);

      expect(result).toEqual(test_data);
    });
    it('결과값 없을 때, 그에 따른 에러 맞는지 확인', async () => {
      const id = 100;

      await expect(service.findOne(id)).rejects.toThrow(
        `해당 정보를 찾을 수 없습니다.`,
      );
    });
  });
});
