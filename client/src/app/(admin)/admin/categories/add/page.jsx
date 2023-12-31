'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAddCategory } from '@/hooks/useCategories';
import CategoryForm from '@/components/CategoryForm';

const AddCategories = () => {
  const { isLoading, mutateAsync } = useAddCategory();
  const [category, setCategory] = useState({
    title: '',
    englishTitle: '',
    description: '',
  });
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...category,
        type: selectedType.value,
      });
      toast.success(message);
      router.push('/admin/categories');
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className='w-full'>
      <h1 className='mb-6 text-4xl font-bold'>اضافه کردن دسته بندی جدید</h1>
      <CategoryForm
        onSubmit={handelSubmit}
        category={category}
        handelChange={handleChange}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        isLoading={isLoading}
        buttonText='افزودن دسته بندی جدید'
      />
    </div>
  );
};

export default AddCategories;
