'use client';

import { useParams } from 'next/navigation';

const PaymentDetails = () => {
  const { id } = useParams();
  return <div>Detail of {id}</div>;
};

export default PaymentDetails;
