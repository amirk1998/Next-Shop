'use client';

import { useGetUser } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const router = useRouter();

  useEffect(() => {
    if (user) router.refresh();
  }, [user]);

  return (
    <main className=''>
      <h1 className='text-4xl font-bold'>صفحه خانه</h1>
    </main>
  );
}
