import { Test, TestingModule } from '@nestjs/testing';
import { RjsController } from './rjs.controller';

describe('RjsController', () => {
  let controller: RjsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RjsController],
    }).compile();

    controller = module.get<RjsController>(RjsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
