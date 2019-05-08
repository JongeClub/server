import { Controller, Get, Query, BadRequestException, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { MockService } from './mock.service';
import { HttpMethod } from 'src/const/schema.const';
import { Mock } from './mock.entity';

export interface MockQuery {
  schema?: string,
  host: string,
  path: string,
  method: HttpMethod
}

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) { }

  @Get()
  mock(@Query() query: MockQuery) {
    const { method, host, path, schema = 'https', ...otherQuery } = query
    if (!method || !host || !path) {
      throw new BadRequestException('`method` or `host` or `path` cannot be empty!')
    }
    return this.mockService.getMock(method, schema, host, path, otherQuery)
  }

  @Get('list')
  list(@Query('api') apiId: string) {
    return this.mockService.getList(apiId)
  }

  @Post()
  create(@Body() mock: Mock) {
    if (!mock.api) throw new BadRequestException('api ID cannot be empty!')
    return this.mockService.create(mock)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() mock: Mock) {
    return this.mockService.update(id, mock)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.mockService.delete(id)
  }
}
