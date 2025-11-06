'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const { isAuthenticated, user, logout, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <nav className="fixed top-0 w-full bg-gray-800 border-b border-gray-700 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GameMateNet
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/games" className="hover:text-primary transition-colors">
              Ігри
            </Link>
            <Link href="/matches" className="hover:text-primary transition-colors">
              Матчі
            </Link>
            <Link href="/players" className="hover:text-primary transition-colors">
              Гравці
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="hover:text-primary transition-colors">
                  {user?.username}
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-secondary"
                >
                  Вийти
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link href="/login" className="btn btn-secondary">
                  Увійти
                </Link>
                <Link href="/register" className="btn btn-primary">
                  Реєстрація
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
