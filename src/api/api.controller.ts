import { Controller, Post, Get, Param, Body, BadRequestException, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ApiService } from './api.service';
import { Api } from './api.entity';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) { }
  @Get()
  async getList(@Query('offset', ParseIntPipe) offset: number, @Query('limit', ParseIntPipe) limit: number): Promise<Api[]> {
    if (limit < 0 || offset < 0) {
      throw new BadRequestException('offset and limit must be negative integer')
    }

    return await this.apiService.list(offset, limit);
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Api> {
    return await this.apiService.one(id);
  }

  @Post()
  async create(@Body() api: Api) {
    // TODO: validate and throw or set default value
    return await this.apiService.create(api)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() api: Api) {
    return await this.apiService.update(id, api)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.apiService.delete(id)
  }
}
