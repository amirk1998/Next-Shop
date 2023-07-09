'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetCategories } from '@/hooks/useCategories';
import Link from 'next/link';
import { HiPlusCircle } from 'react-icons/hi2';
import CategoriesTable from './CategoriesTable';

const CategoryPage = () => {
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};
  console.log(categories);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>دسته بندی محصولات </h1>
        <Link
          className='flex items-center gap-x-2 text-blue-600 transition-all duration-200 hover:text-blue-800'
          href='/admin/categories/add'
        >
          <HiPlusCircle className='h-6 w-6' />
          <span>اضافه کردن دسته بندی</span>
        </Link>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
};

export default CategoryPage;
