'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { matchesAPI } from '@/lib/api';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export default function MatchesPage() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get('gameId');

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, [gameId]);

  const loadMatches = async () => {
    try {
      const params = gameId ? { gameId } : undefined;
      const response = await matchesAPI.getAll(params);
      setMatches(response.data);
    } catch (error) {
      console.error('Помилка завантаження матчів:', error);
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Матчі</h1>
        <Link href="/matches/create" className="btn btn-primary">
          Створити матч
        </Link>
      </div>

      {matches.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400 mb-4">Матчів поки що немає</p>
          <Link href="/matches/create" className="btn btn-primary">
            Створити перший матч
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match: any) => (
            <Link
              key={match.id}
              href={`/matches/${match.id}`}
              className="card hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl">{match.gameName}</h3>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  {match.status}
                </span>
              </div>

              <p className="text-gray-400 mb-3 line-clamp-2">{match.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Платформа:</span>
                  <span>{match.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Рівень:</span>
                  <span>{match.skillLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Гравців потрібно:</span>
                  <span>{match.playersNeeded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Час:</span>
                  <span>{format(new Date(match.scheduledTime), 'dd MMM HH:mm', { locale: uk })}</span>
                </div>
              </div>

              {match.creator && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-500">
                    Створив: <span className="text-white">{match.creator.username}</span>
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
