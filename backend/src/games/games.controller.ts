import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createGameDto: any) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: any) {
    return this.gamesService.update(id, updateGameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }

  @Post('seed')
  seed() {
    return this.gamesService.seed();
  }
}
