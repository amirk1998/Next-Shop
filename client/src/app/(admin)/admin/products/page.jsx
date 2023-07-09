'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetProducts } from '@/hooks/useProducts';
import ProductsTable from './ProductsTable';
import Link from 'next/link';
import { HiPlusCircle } from 'react-icons/hi2';

const ProductsPage = () => {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};
  console.log(products);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>محصولات </h1>
        <Link
          className='flex items-center gap-x-2 text-blue-600 transition-all duration-200 hover:text-blue-800'
          href='/admin/products/add'
        >
          <HiPlusCircle className='h-6 w-6' />
          <span>اضافه کردن محصول</span>
        </Link>
      </div>
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsPage;
