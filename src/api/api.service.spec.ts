import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { Api } from './api.entity';
import { getRepositoryToken } from '@nestjs/typeorm'

const mockData = [
  { id: 1, email: 'test1@email.com', password: '' },
  { id: 2, email: 'valid@email.com', password: '' },
]
const mockRepository = {
  find(offset, limit) {
    return mockData.slice(offset * limit - 1, limit)
  },
};
describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService,
        {
          provide: getRepositoryToken(Api),
          useValue: mockRepository,
        },],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a list', async () => {
    const list = await service.list(0, 2)
    expect(list.length).toBe(2);
  });
});
