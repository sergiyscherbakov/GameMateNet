'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usersAPI } from '@/lib/api';

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const response = await usersAPI.getAll();
      setPlayers(response.data);
    } catch (error) {
      console.error('Помилка завантаження гравців:', error);
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
      <h1 className="text-4xl font-bold mb-8">Гравці</h1>

      {players.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400">Гравців поки що немає</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player: any) => (
            <div key={player.id} className="card">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold">
                  {player.username[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-1">{player.username}</h3>
                  <p className="text-sm text-gray-400 mb-3">{player.bio || 'Немає опису'}</p>

                  {player.games && player.games.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Ігри:</p>
                      <div className="flex flex-wrap gap-1">
                        {player.games.slice(0, 3).map((game: string, idx: number) => (
                          <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {game}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 text-xs">
                    {player.discord && (
                      <span className="bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">
                        Discord
                      </span>
                    )}
                    {player.telegram && (
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                        Telegram
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
