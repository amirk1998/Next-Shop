'use client';
import LoadingSpinner from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth';
import PaymentTable from './PaymentTable';

const PaymentPage = () => {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h1 className='mb-6 text-3xl font-semibold'>سفارشات</h1>
      <PaymentTable payments={payments} />
    </div>
  );
};

export default PaymentPage;
