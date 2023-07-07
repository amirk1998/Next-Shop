'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth';
import { toLocalDateString } from '@/utils/toLocalDate';
import PaymentTable from './payments/PaymentTable';
import Link from 'next/link';

const Profile = () => {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading)
    return (
      <div className='inline-flex items-center'>
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      <h1 className='mb-6 text-3xl font-semibold'>{user.name} خوش آمدی !</h1>
      <p className='mb-4'>تاریخ پیوستن : {toLocalDateString(user.createdAt)}</p>
      <div className='rounded-xl border-2 border-gray-300 p-4 shadow-md'>
        <div className='flex items-center justify-between'>
          <h2 className='mb-2 text-xl font-semibold'>آخرین سفارشات کاربر</h2>
          <Link
            href='/profile/payments'
            className='text-blue-600 hover:text-blue-800'
          >
            مشاهده همه سفارشات
          </Link>
        </div>
        <PaymentTable
          isDesc={false}
          payments={payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)}
        />
      </div>
    </div>
  );
};

export default Profile;
