import { Test, TestingModule } from '@nestjs/testing';
import { QueueScriptService } from './queue-script.service';

describe('QueueScriptService', () => {
  let service: QueueScriptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueScriptService],
    }).compile();

    service = module.get<QueueScriptService>(QueueScriptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
