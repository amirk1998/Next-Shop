'use client';

import LoadingSpinner from '@/common/Loading';
import CouponForm from '@/components/CouponForm';
import { useAddCoupon } from '@/hooks/useCoupon';
import { useGetProducts } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const AddCouponPage = () => {
  const { data: productsData, isLoading: isLoadingProducts } = useGetProducts();
  const { products } = productsData || {};

  const [formData, setFormData] = useState({
    code: '',
    amount: '',
    usageLimit: '',
  });
  const [type, setType] = useState('percent');
  const [productIds, setProductIds] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());
  const { isLoading, mutateAsync } = useAddCoupon();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        expireDate: new Date(expireDate).toISOString(),
        productIds: productIds.map((p) => p._id),
        type,
      });
      toast.success(message);
      router.push('/admin/coupons');
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  if (isLoadingProducts) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='mb-6 text-4xl font-bold'>اضافه کردن کد تخفیف جدید </h1>
      <CouponForm
        onSubmit={handleSubmit}
        coupon={formData}
        type={type}
        setType={(e) => setType(e.target.value)}
        products={products}
        setProductIds={setProductIds}
        expireDate={expireDate}
        setExpireDate={(date) => setExpireDate(date)}
        handelChange={handleChange}
        isLoading={isLoading}
        buttonText='افزودن کد تخفیف'
      />
    </div>
  );
};

export default AddCouponPage;
