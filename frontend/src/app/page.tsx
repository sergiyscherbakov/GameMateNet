'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { gamesAPI, matchesAPI } from '@/lib/api';

export default function Home() {
  const [games, setGames] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [gamesRes, matchesRes] = await Promise.all([
        gamesAPI.getAll(),
        matchesAPI.getAll(),
      ]);
      setGames(gamesRes.data);
      setMatches(matchesRes.data.slice(0, 6));
    } catch (error) {
      console.error('Помилка завантаження даних:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          GameMateNet
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Платформа для пошуку ігрових партнерів та створення команд
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/matches" className="btn btn-primary text-lg px-8 py-3">
            Знайти гру
          </Link>
          <Link href="/register" className="btn btn-secondary text-lg px-8 py-3">
            Реєстрація
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center">
          <div className="text-4xl mb-4">🎮</div>
          <h3 className="text-xl font-bold mb-2">Популярні ігри</h3>
          <p className="text-gray-400">
            CS2, Dota 2, Valorant та багато інших
          </p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2">Знайди команду</h3>
          <p className="text-gray-400">
            Підбір гравців за рівнем та стилем гри
          </p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-bold mb-2">Спілкування</h3>
          <p className="text-gray-400">
            Discord, Telegram інтеграції
          </p>
        </div>
      </section>

      {/* Popular Games */}
      {!loading && games.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Популярні ігри</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {games.slice(0, 4).map((game: any) => (
              <Link
                key={game.id}
                href={`/matches?gameId=${game.id}`}
                className="card hover:border-primary transition-colors cursor-pointer"
              >
                <h3 className="font-bold text-lg mb-2">{game.name}</h3>
                <p className="text-sm text-gray-400">{game.platforms?.join(', ')}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Matches */}
      {!loading && matches.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Останні матчі</h2>
            <Link href="/matches" className="text-primary hover:underline">
              Дивитись всі →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match: any) => (
              <Link key={match.id} href={`/matches/${match.id}`} className="card hover:border-primary transition-colors">
                <h3 className="font-bold text-lg mb-2">{match.gameName}</h3>
                <p className="text-gray-400 mb-2">{match.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{match.platform}</span>
                  <span>{match.skillLevel}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">Завантаження...</p>
        </div>
      )}
    </div>
  );
}
