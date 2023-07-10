'use client';

import CouponForm from '@/components/CouponForm';
import { useGetProducts } from '@/hooks/useProducts';
import { useState } from 'react';

const AddCouponPage = () => {
  const { data: productsData, isLoading } = useGetProducts();
  const { products } = productsData || {};

  const [formData, setFormData] = useState({
    code: '',
    amount: '',
    usageLimit: '',
  });

  const [type, setType] = useState('percent');

  const [productIds, setProductIds] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...category, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className='mb-6 text-4xl font-bold'>اضافه کردن کد تخفیف جدید </h1>
      <CouponForm
        onSubmit={() => console.log()}
        coupon={formData}
        type={type}
        setType={(e) => setType(e.target.value)}
        products={products}
        setProductIds={setProductIds}
        handelChange={handleChange}
        isLoading={false}
        buttonText='افزودن کد تخفیف'
      />
    </div>
  );
};

export default AddCouponPage;
