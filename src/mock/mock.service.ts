import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as jsf from 'json-schema-faker';
import { Mock } from './mock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from 'src/api/api.entity';
import { ApiService } from 'src/api/api.service';
import { HttpMethod } from 'src/const/schema.const';
import { isConditionMatch, isPartOfObject } from './util';
import { getVariablePathValue } from 'src/api/util';
@Injectable()
export class MockService {
  // CRUD
  getList(apiId: string) {
    return this.mockRepository.find({
      api: apiId
    });
  }
  delete(id: string) {
    return this.mockRepository.delete(id)
  }
  deleteByApi(apiId: string) {
    return this.mockRepository.delete({ api: apiId })
  }
  create(mock: Mock) {
    return this.mockRepository.insert(mock)
  }
  update(id: string, mock: Mock) {
    return this.mockRepository.update(id, mock)
  }

  /**
   * get mock data
   * 
   * work flow:
   * ```js
   * if API not exists, throw 404
   * if mock data exist,
   *    if no condition specified(i.e. `otherQuery`),
   *        if there is a mock that has empty `condition` field, return that mock data
   *    else
   *        if condition matched, return the mock data
   * return auto mocked data
   * ```
   * @param schema 
   * @param host 
   * @param path 
   * @param otherQuery other queries to match mock data by the `condition` field
   */
  async getMock(method: HttpMethod, schema: string, host: string, path: string, otherQuery: {}) {
    // TODO: return matched mock data, if not exist return no `match` data, or return autoMock()

    const apiList = await this.apiService.getApiList(method, schema, host, path, otherQuery)
    let api: Api = null
    if (apiList.length) {
      api = apiList[0]
    } else {
      throw new NotFoundException('not API definition found.')
    }

    // find mock by api ID, and filter by condition match
    const mockList = await this.mockRepository.find({ api: `${api.id}` })
    let mock = null
    if (mockList.length) {
      const candidates = mockList.filter(m => {
        if (m.condition) {
          const { path: conditionPath, query: conditionQuery } = m.condition
          let flag = false
          if (conditionPath) {
            const pathVariables = getVariablePathValue(api.path, path)
            isAllConditionMatch(conditionPath, pathVariables)
            flag = conditionPath.some(condition => {
              return Object.entries(condition).every(([cKey, cValue]) => {
                return pathVariables.hasOwnProperty(cKey) && isConditionMatch(cValue, pathVariables[cKey])
              })
            })
          }
          // path not match, break
          if(!flag) return false

          conditionQuery.some(condition => {
            return Object.entries(condition).every(([cKey, cValue]) => {
              return otherQuery.hasOwnProperty(cKey) && isConditionMatch(cValue, otherQuery[cKey])
            })
          })
        }
      })
      mock = mockList[0]
    }

    // mock not exist: 1. no mock data; 2. mock is not matched and no none-`condition`-field mock data
    if (!mock) {
      mock = this.autoMock(api)
    }

    return mock
  }
  constructor(
    @InjectRepository(Mock)
    private readonly mockRepository: Repository<Mock>,
    // @Inject('ApiService')
    private readonly apiService: ApiService
  ) { }

  async autoMock(schema: Api) {
    return await jsf.resolve(schema.response)
  }
}
