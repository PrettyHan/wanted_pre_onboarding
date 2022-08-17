import { Test, TestingModule } from '@nestjs/testing';
import { WantedController } from './wanted.controller';
import { WantedService } from './wanted.service';
import { Repository } from 'typeorm';
import { wantedEntity } from './entity/wanted.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = () => ({
  save: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('WantedController', () => {
  let controller: WantedController;
  let service: WantedService;
  let repository: MockRepository<wantedEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WantedController],
      providers: [
        WantedService,
        {
          provide: getRepositoryToken(wantedEntity),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    controller = module.get<WantedController>(WantedController);
    service = module.get<WantedService>(WantedService);
    repository = module.get(getRepositoryToken(wantedEntity));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('findOne <라우터> 작동 확인', async () => {
      const wanted_test = {
        id: 1,
        company_id: 1,
        position: 'test',
        reward: 10000,
        content: 'test',
        skill: 'test',
      };
      const spy = jest.spyOn(service, 'findOne').mockResolvedValue(wanted_test);
      expect(await controller.findOne(1)).toStrictEqual(wanted_test);
      expect(spy).toBeCalledWith(1);
    });
  });
});
