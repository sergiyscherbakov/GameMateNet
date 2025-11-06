import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMatchDto: any) {
    return this.matchesService.create(createMatchDto);
  }

  @Get()
  findAll(@Query('gameId') gameId?: string, @Query('creatorId') creatorId?: string) {
    if (gameId) {
      return this.matchesService.findByGame(gameId);
    }
    if (creatorId) {
      return this.matchesService.findByCreator(creatorId);
    }
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: any) {
    return this.matchesService.update(id, updateMatchDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchesService.remove(id);
  }
}
