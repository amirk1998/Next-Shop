'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth';
import Link from 'next/link';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartPage = () => {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  if (isLoading)
    return (
      <div className='flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );

  if (!user || !data)
    return (
      <div className='container lg:max-w-screen-lg'>
        <p className='mb-4 font-bold text-secondary-700'>
          برای مشاهده سبد خرید ، لطفا لاگین کنید.
        </p>
        <Link
          href='/auth?redirect=/cart'
          className='text-lg font-bold text-primary-900 transition-all duration-200 hover:text-primary-800'
        >
          رفتن به صفحه لاگین ؟
        </Link>
      </div>
    );

  if (!user.cart?.products || user.cart?.products.length === 0)
    return (
      <div>
        <p className='mb-4 font-bold text-secondary-700'>سبد خرید خالیه !</p>
        <Link
          href='/products'
          className='text-lg font-bold text-primary-900 transition-all duration-200 hover:text-primary-800'
        >
          رفتن به صفحه محصولات ؟
        </Link>
      </div>
    );

  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='col-span-3 space-y-4'>
        {cart &&
          cart.productDetail.map((item) => {
            return <CartItem cartItem={item} key={item._id} />;
          })}
      </div>
      <div className='col-span-1'>
        <CartSummary payDetail={cart.payDetail} />
      </div>
    </div>
  );
};

export default CartPage;
