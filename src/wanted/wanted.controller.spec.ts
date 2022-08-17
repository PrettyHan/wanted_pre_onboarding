import { Test, TestingModule } from '@nestjs/testing';
import { WantedController } from './wanted.controller';
import { WantedService } from './wanted.service';

describe('WantedController', () => {
  let controller: WantedController;
  let service: WantedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WantedController],
      providers: [WantedService],
    }).compile();

    controller = module.get<WantedController>(WantedController);
    service = module.get<WantedService>(WantedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('service 불러와야 댐', async () => {
      const wanted_test = {
        id: 1,
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
