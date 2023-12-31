'use client';

import { useAddToCart, useDecrementFromCart } from '@/hooks/useCart';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { HiOutlineTrash, HiPlus, HiMinus } from 'react-icons/hi';

const CartItem = ({ cartItem }) => {
  const { isLoading, mutateAsync: addToCartAsync } = useAddToCart();
  const { mutateAsync: decFromCartAsync } = useDecrementFromCart();
  const queryClient = useQueryClient();

  const handlerAddToCart = async () => {
    try {
      const { message } = await addToCartAsync(cartItem._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handlerDecrement = async () => {
    try {
      const { message } = await decFromCartAsync(cartItem._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className='flex justify-between rounded-xl border p-4 shadow-md transition-all duration-200 hover:border-secondary-200 hover:shadow-xl'>
      <span className='flex-1 font-bold'>{cartItem.title}</span>
      <div className='flex flex-1 items-center justify-between gap-x-8'>
        <div>
          <div className='ml-2'>
            قیمت :
            <span
              className={`mr-2 ${
                cartItem.discount ? 'text-gray-500 line-through' : 'font-bold'
              }`}
            >
              {toPersianNumbersWithComma(cartItem.price)}
            </span>
          </div>
          {!!cartItem.discount && (
            <div className='mt-2 flex items-center gap-x-2'>
              <p className='font-bold'>
                {toPersianNumbersWithComma(cartItem.offPrice)}
              </p>
              <div className='rounded-xl bg-rose-500 px-2 py-0.5 text-sm text-white'>
                {toPersianNumbers(cartItem.discount)} %
              </div>
            </div>
          )}
        </div>
        <div className='mr-2'>
          <p className={`${cartItem.discount ? 'mr-3' : 'mr-8'}`}>
            تعداد :
            <span className='mr-1 font-bold'>
              {toPersianNumbers(cartItem.quantity)}
            </span>
          </p>
        </div>
        <div className='flex gap-x-2'>
          <button
            onClick={handlerAddToCart}
            className='rounded bg-primary-900 p-1 text-white hover:bg-primary-700'
          >
            <HiPlus className='h-4 w-4' />
          </button>
          <button
            onClick={handlerDecrement}
            className='rounded border border-rose-500 p-1 text-rose-500 hover:bg-rose-500 hover:text-white '
          >
            {cartItem.quantity > 1 ? (
              <HiMinus className='h-4 w-4' />
            ) : (
              <HiOutlineTrash className='h-4 w-4' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
