'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { gamesAPI } from '@/lib/api';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const response = await gamesAPI.getAll();
      setGames(response.data);
    } catch (error) {
      console.error('Помилка завантаження ігор:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Завантаження...</div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Ігри</h1>

      {games.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400 mb-4">Ігор поки що немає</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game: any) => (
            <Link
              key={game.id}
              href={`/matches?gameId=${game.id}`}
              className="card hover:border-primary transition-all transform hover:scale-105"
            >
              <h3 className="font-bold text-xl mb-2">{game.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{game.description}</p>
              <div className="text-xs text-gray-500">
                <div className="mb-1">
                  <span className="font-medium">Платформи:</span> {game.platforms?.join(', ')}
                </div>
                {game.genres && (
                  <div>
                    <span className="font-medium">Жанри:</span> {game.genres.join(', ')}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
