'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetCategoryById } from '@/hooks/useCategories';
import { useParams } from 'next/navigation';

const CategoryDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};
  console.log(category);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='mb-6 text-4xl font-bold'>جزئیات دسته بندی </h1>
      <div>
        <p>نام دسته بندی : {category.title}</p>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
//TODO : Complete This Page
