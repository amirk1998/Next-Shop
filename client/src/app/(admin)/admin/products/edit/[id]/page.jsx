'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetProductById, useUpdateProduct } from '@/hooks/useProducts';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetCategories } from '@/hooks/useCategories';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { includeObj } from '@/utils/objectUtils';

const includesProductKey = [
  'title',
  'description',
  'slug',
  'brand',
  'price',
  'discount',
  'offPrice',
  'countInStock',
  'imageLink',
];

const EditProductPage = () => {
  const { id } = useParams();
  const { data, isLoading: isLoadingProduct } = useGetProductById(id);
  const { product } = data || {};
  const { data: CategoryData } = useGetCategories();
  const { categories } = CategoryData || {};
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
  const { isLoading, mutateAsync } = useUpdateProduct();
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setFormData(includeObj(product, includesProductKey));
      setTags(product.tags);
      setSelectedCategory(product.category);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        productId: product._id,
        data: {
          ...formData,
          tags,
          category: selectedCategory._id,
        },
      });
      toast.success(message);
      router.push('/admin/products');
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  if (isLoadingProduct) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='mb-6 text-4xl font-bold'>ویرایش محصول </h1>
      <ProductForm
        onSubmit={handelSubmit}
        tags={tags}
        setTags={setTags}
        categories={categories}
        selectedCategory={product.category}
        setSelectedCategory={setSelectedCategory}
        productData={formData}
        productDataOnChange={handleChange}
        isLoading={isLoading}
        buttonText='ویرایش کردن محصول'
      />
    </div>
  );
};

export default EditProductPage;
