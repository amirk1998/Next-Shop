'use client';
const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { useGetCategoryById, useUpdateCategory } from '@/hooks/useCategories';
import CategoryForm, { categoryTypes } from '@/components/CategoryForm';
import { includeObj } from '@/utils/objectUtils';
import LoadingSpinner from '@/common/Loading';

const includesCategoryKey = ['title', 'englishTitle', 'description'];

const EditCategories = () => {
  const { id } = useParams();
  const { data, isLoading: isLoadingCategory } = useGetCategoryById(id);
  const { category } = data || {};
  console.log(category);
  const [formData, setFormData] = useState({
    title: '',
    englishTitle: '',
    description: '',
  });
  const [selectedType, setSelectedType] = useState('');
  const { isLoading, mutateAsync } = useUpdateCategory();
  const router = useRouter();

  console.log(selectedType.value);

  useEffect(() => {
    if (category) {
      setSelectedType(categoryTypes.find((c) => c.value === category.type));
      setFormData(includeObj(category, includesCategoryKey));
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        categoryId: category._id,
        data: {
          ...category,
          type: selectedType.value,
        },
      });
      toast.success(message);
      router.push('/admin/categories');
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  if (isLoadingCategory) return <LoadingSpinner />;

  return (
    <div className='w-full'>
      <h1 className='mb-6 text-4xl font-bold'>ویرایش دسته بندی </h1>
      <CategoryForm
        onSubmit={handelSubmit}
        categoryData={formData}
        categoryDataOnChange={handleChange}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        isLoading={isLoading}
        buttonText='ویرایش دسته بندی '
      />
    </div>
  );
};

export default EditCategories;
// TODO => FIX BUG : REACT_SELECT
//BUG
