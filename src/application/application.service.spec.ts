import { NotAcceptableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationService } from './application.service';
import { applicationEntity } from './entity/application.entity';

const mockRepository = () => ({
  save: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
// Partial : 타입 T의 모든 요소를 optional하게 한다.
// Record : 타입 T의 모든 K의 집합으로 타입을 만들어준다.
// keyof Repository<T> : Repository의 모든 method key를 불러온다.
// jest.Mock : 3번의 key들을 다 가짜로 만들어준다.
// type MockRepository<T = any> : 이를 type으로 정의해준다.

describe('ApplicationSerivce', () => {
  let service: ApplicationService;
  let repository: MockRepository<applicationEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(applicationEntity),
          useValue: mockRepository(),
        },
      ],
    }).compile();
    service = module.get<ApplicationService>(ApplicationService);
    repository = module.get(getRepositoryToken(applicationEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('요청시 잘 만들어지는지 확인', async () => {
      const test_data = {
        user_id: 1,
        wanted_id: 1,
      };

      const spy = jest.spyOn(service, 'create').mockReturnValue(undefined);

      const result = await service.create(test_data);
      expect(result).toEqual(undefined);
    });
    it('중복 지원시, 에러메세지 출력 확인 (한번 만 지원가능)', async () => {
      const test_data = {
        user_id: 2,
        wanted_id: 2,
      };

      jest.spyOn(service, 'create').mockReturnValue(undefined);
      const result = await service.create(test_data);

      expect(result).toEqual(undefined);
      console.log(result);
    });
  });
});
