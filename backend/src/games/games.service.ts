import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async create(gameData: Partial<Game>): Promise<Game> {
    const game = this.gamesRepository.create(gameData);
    return this.gamesRepository.save(game);
  }

  async findAll(): Promise<Game[]> {
    return this.gamesRepository.find({
      order: { popularity: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gamesRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException(`Гру з ID ${id} не знайдено`);
    }
    return game;
  }

  async update(id: string, updateData: Partial<Game>): Promise<Game> {
    await this.gamesRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.gamesRepository.delete(id);
  }

  async seed(): Promise<void> {
    const games = [
      {
        name: 'Counter-Strike 2',
        description: 'Тактичний шутер від першої особи',
        platforms: ['PC', 'Steam'],
        genres: ['FPS', 'Tactical'],
        popularity: 100,
      },
      {
        name: 'Dota 2',
        description: 'Multiplayer online battle arena',
        platforms: ['PC', 'Steam'],
        genres: ['MOBA', 'Strategy'],
        popularity: 95,
      },
      {
        name: 'League of Legends',
        description: 'MOBA гра з величезною спільнотою',
        platforms: ['PC'],
        genres: ['MOBA', 'Strategy'],
        popularity: 98,
      },
      {
        name: 'Valorant',
        description: 'Тактичний командний шутер',
        platforms: ['PC'],
        genres: ['FPS', 'Tactical'],
        popularity: 90,
      },
    ];

    for (const gameData of games) {
      const existingGame = await this.gamesRepository.findOne({ where: { name: gameData.name } });
      if (!existingGame) {
        await this.create(gameData);
      }
    }
  }
}
