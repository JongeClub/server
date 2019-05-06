import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from './api.entity';

@Injectable()
export class ApiService {
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

  getOneByCondition(schema: string='https', host: string, path: string) {
    return this.apiRepository.find()
  }

  async create(api: Api) {
    // TODO: validate duplicated api
    const existApi = await this.getOneByCondition(api.schema, api.host, api.path)
    if (existApi.length > 0) {
      throw new BadRequestException('same api all ready exist')
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
