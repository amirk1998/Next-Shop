'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetProductById } from '@/hooks/useProducts';
import { useParams } from 'next/navigation';

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='mb-6 text-4xl font-bold'>جزئیات محصول </h1>
      <div>
        <p>نام محصول : {product.title}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
//TODO : Complete This Page Data
