import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchesRepository: Repository<Match>,
  ) {}

  async create(matchData: Partial<Match>): Promise<Match> {
    const match = this.matchesRepository.create(matchData);
    return this.matchesRepository.save(match);
  }

  async findAll(): Promise<Match[]> {
    return this.matchesRepository.find({
      relations: ['creator'],
      order: { scheduledTime: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchesRepository.findOne({
      where: { id },
      relations: ['creator'],
    });
    if (!match) {
      throw new NotFoundException(`Матч з ID ${id} не знайдено`);
    }
    return match;
  }

  async findByGame(gameId: string): Promise<Match[]> {
    return this.matchesRepository.find({
      where: { gameId },
      relations: ['creator'],
      order: { scheduledTime: 'ASC' },
    });
  }

  async findByCreator(creatorId: string): Promise<Match[]> {
    return this.matchesRepository.find({
      where: { creatorId },
      relations: ['creator'],
      order: { scheduledTime: 'DESC' },
    });
  }

  async update(id: string, updateData: Partial<Match>): Promise<Match> {
    await this.matchesRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.matchesRepository.delete(id);
  }
}
