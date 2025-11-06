'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      login(response.data.user, response.data.access_token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Помилка входу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold mb-6 text-center">Вхід</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Пароль</label>
              <input
                type="password"
                className="input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Вхід...' : 'Увійти'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Немає акаунту?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Зареєструватись
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
