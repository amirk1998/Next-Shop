'use client';

import LoadingButton from '@/common/LoadingButton';
import { useGetUser } from '@/hooks/useAuth';
import { useAddToCart } from '@/hooks/useCart';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const AddToCart = ({ product }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useGetUser();
  const { user } = data || {};
  const { isLoading, mutateAsync } = useAddToCart();

  const handlerAddToCart = async (e) => {
    if (!user) {
      toast.error('لطفا ابتدا وارد حساب کاربری خود شوید !');
      router.push('/auth');
      return;
    }

    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const isInCart = (user, product) => {
    if (!user) return false;
    return user && user.cart?.products.some((p) => p.productId === product._id);
  };

  return (
    <div>
      {isInCart(user, product) ? (
        <Link
          className='font-bold text-primary-700 hover:text-primary-900'
          href='/cart'
        >
          {' '}
          ادامه سفارش ؟
        </Link>
      ) : isLoading ? (
        <LoadingButton />
      ) : (
        <button onClick={handlerAddToCart} className='btn btn--primary'>
          اضافه کردن به سبد خرید
        </button>
      )}
    </div>
  );
};

export default AddToCart;
