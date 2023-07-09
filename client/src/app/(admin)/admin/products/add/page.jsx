'use client';

import { useGetCategories } from '@/hooks/useCategories';
import { useState } from 'react';
import { useAddProduct } from '@/hooks/useProducts';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';

const AddProducts = () => {
  const { isLoading, mutateAsync } = useAddProduct();
  const { data } = useGetCategories();
  const { categories } = data || {};
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    brand: '',
    price: '',
    discount: '',
    offPrice: '',
    countInStock: '',
    imageLink: '',
  });
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        tags,
        category: selectedCategory._id,
      });
      toast.success(message);
      router.push('/admin/products');
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className='w-full'>
      <h1 className='mb-6 text-4xl font-bold'>اضافه کردن محصول</h1>
      <ProductForm
        onSubmit={handelSubmit}
        tags={tags}
        setTags={setTags}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        productData={formData}
        productDataOnChange={handleChange}
        isLoading={isLoading}
        buttonText='اضافه کردن محصول'
      />
    </div>
  );
};

export default AddProducts;
