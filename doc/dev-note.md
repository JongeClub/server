

## database

```bash
# 数据库（ORM: typeorm，DB: mongodb
yarn add @nestjs/typeorm typeorm mongodb reflect-metadata
```

在 `main.ts` 中导入 `reflect-metadata`: `import "reflect-metadata";`

配置 typeorm：

添加：`ormconfig.json`

```json
{
  "type": "mongodb",
  "host": "localhost",
  "database": "jonge",
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/**/*.entity.ts"
  ],
  "useNewUrlParser": true
}
```

### entity mocking

service 定义 `service.ts`：

```js
import { Demo } from './demo.entity';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(Api)
    private readonly demoRepository: Repository<Demo>,
  ) {}

  async list(offset:number, limit: number): Promise<Demo[]> {
    return await this.demoRepository.find({
      skip: offset,
      take: limit
    });
  }
}

```

## provider

测试 `service.test.ts`：

```js
import { Demo } from './demo.entity';

const mockData = [
  { id: 1, email: 'test1@email.com', password: '' },
  { id: 2, email: 'valid@email.com', password: '' },
]
const mockRepository = {
  find(offset, limit) {
    return mockData.slice(offset * limit - 1, limit)
  },
};

describe('DemoService', () => {
  let service: DemoService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoService,
        {
          provide: getRepositoryToken(Demo),
          useValue: mockRepository,
        },],
    }).compile();

    service = module.get<DemoService>(ApiService);
  });

  it('should get a list with length=2', async () => {
    const list = await service.list(0, 2)
    expect(list.length).toBe(2);
  });
});
```

## 模块

**注意**：如果想在 B 模块内使用 A 模块的 service，那么需要在 A 模块内导出。

```js
// a.module.ts
import { AService } from './a.service';

@Module({
  // ...
  exports: [AService], // <-- 这里
})

// b.service.ts
import { AService } from 'xx/a.service'

export BService {
  // ...
  b () {
    aService.xx()
  }
}
```

----

参考：[nestjs mongo typeorm](https://github.com/nestjs/nest/tree/master/sample/13-mongo-typeorm)

