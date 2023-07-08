'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetProducts } from '@/hooks/useProducts';
import ProductsTable from './ProductsTable';

const ProductsPage = () => {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};
  console.log(products);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='text-4xl font-bold'>محصولات </h1>
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsPage;
