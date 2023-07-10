'use client';

import { useGetCoupons } from '@/hooks/useCoupon';
import CouponsTable from './CouponsTable';
import LoadingSpinner from '@/common/Loading';
import { HiPlusCircle } from 'react-icons/hi2';
import Link from 'next/link';

const CouponsPage = () => {
  const { data, isLoading } = useGetCoupons();
  const { coupons } = data || {};

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>کدهای تخفیف </h1>
        <Link
          className='flex items-center gap-x-2 text-blue-600 transition-all duration-200 hover:text-blue-800'
          href='/admin/coupons/add'
        >
          <HiPlusCircle className='h-6 w-6' />
          <span>اضافه کردن کد تخفیف</span>
        </Link>
      </div>
      <CouponsTable coupons={coupons} />
    </div>
  );
};

export default CouponsPage;
