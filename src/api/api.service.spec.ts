import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { Api } from './api.entity';
import { getRepositoryToken } from '@nestjs/typeorm'

const mockData = [
  { id: 1, schema: 'https', host: 'jonge.club', path: '/demo/list', response: {} },
  { id: 1, schema: 'https', host: 'jonge.club', path: '/demo/:id', response: { msg: { type:'const', value: '1 variable in path' } } },
  { id: 2, schema: 'https', host: 'jonge.club', path: '/demo/:id/detai/{prop}', response: { msg: { type: 'const', value: '2 variables in path' } } },
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
