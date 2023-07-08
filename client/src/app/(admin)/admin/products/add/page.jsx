'use client';

import TextField from '@/common/TextField';
import { useGetCategories } from '@/hooks/useCategories';
import { useState } from 'react';
import TagsInput from 'react-tagsinput';
import Select from 'react-select';
import { useAddProduct } from '@/hooks/useProducts';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoadingButton from '@/common/LoadingButton';

const productsFormData = [
  {
    id: 1,
    label: 'عنوان',
    name: 'title',
  },
  {
    id: 2,
    label: 'توضیحات',
    name: 'description',
  },
  {
    id: 3,
    label: 'اسلاگ',
    name: 'slug',
  },
  {
    id: 4,
    label: 'برند',
    name: 'brand',
  },
  {
    id: 5,
    label: 'قیمت',
    name: 'price',
  },
  {
    id: 6,
    label: 'تخفیف',
    name: 'discount',
  },
  {
    id: 7,
    label: 'قیمت بعد از تخفیف',
    name: 'offPrice',
  },
  {
    id: 8,
    label: 'موجودی',
    name: 'countInStock',
  },
  {
    id: 9,
    label: 'لینک عکس محصول',
    name: 'imageLink',
  },
];

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#f3f4f6',
    padding: '8px 0px',
    borderRadius: '12px',
  }),
};

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
  console.log(tags);
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
    <div className='w-full max-w-sm'>
      <h1 className='mb-6 text-4xl font-bold'>اضافه کردن محصول</h1>
      <form className='w-full space-y-6' onSubmit={handelSubmit}>
        {productsFormData.map((item) => {
          return (
            <TextField
              label={item.label}
              name={item.name}
              key={item.id}
              value={formData[item.name]}
              onChange={handleChange}
            />
          );
        })}
        <div>
          <label htmlFor='category' className='mb-4 block'>
            دسته بندی
          </label>
          <Select
            instanceId='category'
            name='category'
            onChange={setSelectedCategory}
            options={categories}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.englishTitle}
            styles={customStyles}
            placeholder='دسته بندی'
            isRtl={true}
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='tags' className='mb-4 block'>
            تگ محصولات
          </label>
          <TagsInput
            value={tags}
            onChange={setTags}
            id='tags'
            name='tags'
            className='react-tagsinput'
          />
        </div>
        <div>
          {isLoading ? (
            <LoadingButton isWidthFull={true} />
          ) : (
            <button type='submit' className='btn btn--primary w-full'>
              اضافه کردن محصول
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
