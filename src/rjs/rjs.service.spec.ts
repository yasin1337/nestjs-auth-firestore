import { Test, TestingModule } from '@nestjs/testing';
import { RjsService } from './rjs.service';

describe('RjsService', () => {
  let service: RjsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RjsService],
    }).compile();

    service = module.get<RjsService>(RjsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
