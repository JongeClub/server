import { Injectable } from '@nestjs/common';
import jsf from 'json-schema-faker';
import { Api } from 'src/api/api.entity';

@Injectable()
export class MockService {
  async autoMock(schema: Api) {
    return await jsf.resolve(schema)
  }
}
