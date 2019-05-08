import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from './api.entity';
import { HttpMethod } from 'src/const/schema.const';
import { isMatch, isVariablePath } from './util';

@Injectable()
export class ApiService {
  async getApiList(method: HttpMethod, schema: string, host: string, path: string, otherQuery?: {}) {
    let apiList = await this.apiRepository.find({ method,schema,host,path})

    // `method + schema + host + path` full matched API not exist
    // `path` may get variables, like :id, {id}
    if (!isVariablePath(path)) { // no need for variable `path`, already called above in find() by full match
      apiList = await this.apiRepository.find({ method, schema, host })
      apiList = apiList.filter(api => {
        return isMatch(api.path, path)
      })
    }

    // TODO: use `otherQuery` to get specified one

    return apiList
  }
  constructor(
    @InjectRepository(Api)
    private readonly apiRepository: Repository<Api>,
  ) { }

  list(offset: number, limit: number): Promise<Api[]> {
    return this.apiRepository.find({
      skip: offset,
      take: limit,
    });
  }

  one(id: string) {
    return this.apiRepository.findOne(id);
  }

  async create(api: Api) {
    // TODO: validate duplicated api
    const existApi = await this.getApiList(api.method, api.schema, api.host, api.path)
    if (existApi.length > 0) {
      throw new BadRequestException('apis with same <method,schema,host,path> already exist: ' + existApi[0].id)
    }
    return this.apiRepository.insert(api)
  }

  update(id: string, api: Api) {
    return this.apiRepository.update(id, api)
  }
  delete(id: string) {
    return this.apiRepository.delete(id)
  }
}
