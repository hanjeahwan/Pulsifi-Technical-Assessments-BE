import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';

describe('JobService', () => {
  let service: JobService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService],
    }).compile();
    service = module.get<JobService>(JobService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
