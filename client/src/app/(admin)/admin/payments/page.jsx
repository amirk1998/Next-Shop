'use client';

import { useGetPayments } from '@/hooks/usePayment';
import AdminPaymentTable from './AdminPaymentTable';
import LoadingSpinner from '@/common/Loading';

const PaymentPage = () => {
  const { data, isLoading } = useGetPayments();
  const { payments } = data || {};

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='text-4xl font-bold'> سفارشات</h1>
      <AdminPaymentTable payments={payments} />
    </div>
  );
};

export default PaymentPage;
