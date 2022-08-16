import { Test, TestingModule } from '@nestjs/testing';
import { WantedController } from './wanted.controller';
import { WantedModule } from './wanted.module';

describe('WantedController', () => {
  let controller: WantedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WantedController],
      imports: [WantedModule],
    }).compile();

    controller = module.get<WantedController>(WantedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
