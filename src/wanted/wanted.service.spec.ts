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
  create: jest.fn(),
  find: jest.fn(),
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

  describe('create', () => {
    it('요청시 잘 만들어지는지 확인', async () => {
      const test_data = {
        company_id: 2,
        position: 'test',
        reward: 20000,
        content: 'test',
        skill: 'test',
      };
      repository.create.mockReturnValue(undefined);

      const result = await service.create(test_data);
      expect(result).toEqual(undefined);
    });
  });

  describe('list', () => {
    it('요청시 잘 만들어지는지 확인', async () => {
      const test_list = [
        {
          id: 1,
          position: 'test2 test3 test1 test123 testtesttest',
          reward: 10000,
          skill: 'test3',
          company: {
            id: 1,
            name: '네이버',
            country: '대한민국',
            region: '서울',
          },
        },
      ];

      repository.find.mockReturnValue(test_list);

      const result = await service.findAll();
      expect(result).toEqual(test_list);
    });
  });

  describe('findOne', () => {
    it('요청 받은 값 == return 값 확인', async () => {
      const id = 3;
      const test_data = {
        id: 3,
        company_id: 2,
        position: '포지션',
        reward: 10000,
        content: '내용',
        skill: 'test3',
        company: [],
        otherWanted: [],
      };
      repository.findOne.mockReturnValue(test_data);
      const spy = jest.spyOn(service, 'findOne').mockResolvedValue(test_data);
      expect(await service.findOne(id)).toStrictEqual(test_data);
      expect(spy).toBeCalledWith(id);
    });
    it('결과값 없을 때, 그에 따른 에러 맞는지 확인', async () => {
      const id = 100;

      await expect(service.findOne(id)).rejects.toThrow(
        `해당 정보가 없습니다.`,
      );
    });
  });
});
