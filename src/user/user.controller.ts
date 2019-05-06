import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @Get()
  @UseGuards(AuthGuard('bearer'))
  findAll() {
    return [];
  }
}
