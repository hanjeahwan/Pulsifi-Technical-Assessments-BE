import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';

describe('Job Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [JobController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: JobController = module.get<JobController>(JobController);
    expect(controller).toBeDefined();
  });
});
