'use client';

import LoadingSpinner from '@/common/Loading';
import CouponForm from '@/components/CouponForm';
import { useGetCouponById, useUpdateCoupon } from '@/hooks/useCoupon';
import { useGetProducts } from '@/hooks/useProducts';
import { includeObj } from '@/utils/objectUtils';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const includesCouponKey = ['code', 'amount', 'usageLimit'];

const EditCouponPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCouponById(id);
  const { coupon } = data || {};
  console.log(coupon);
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
  const { isLoading: isUpdatingCoupon, mutateAsync } = useUpdateCoupon();
  const router = useRouter();

  useEffect(() => {
    if (coupon) {
      setFormData(includeObj(coupon, includesCouponKey));
      setType(coupon.type);
      setExpireDate(new Date(coupon.expireDate));
      setProductIds(coupon.productIds);
    }
  }, [data]);

  console.log(productIds);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id: coupon._id,
        data: {
          ...formData,
          expireDate: new Date(expireDate).toISOString(),
          productIds: productIds.map((p) => p._id),
          type,
        },
      });
      toast.success(message);
      router.push('/admin/coupons');
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='mb-6 text-4xl font-bold'>ویرایش کد تخفیف </h1>
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
        isLoading={isUpdatingCoupon}
        buttonText='ویرایش کد تخفیف'
        defaultValue={coupon.productIds}
      />
    </div>
  );
};

export default EditCouponPage;
