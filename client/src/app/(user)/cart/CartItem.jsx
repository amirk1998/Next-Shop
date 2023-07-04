import { HiOutlineTrash, HiPlus, HiMinus } from 'react-icons/hi';

const CartItem = ({ cartItem }) => {
  return (
    <div className='flex justify-between rounded-xl border border-secondary-300 p-4'>
      <span className='flex-1 font-bold'>{cartItem.title}</span>
      <div className='flex items-center justify-between gap-x-8'>
        <span> تعداد : {cartItem.quantity}</span>
        <div className='flex gap-x-2'>
          <button className='rounded bg-primary-900 p-1 text-white hover:bg-primary-700'>
            <HiPlus className='h-4 w-4' />
          </button>
          <button>
            <HiOutlineTrash className='h-6 w-6 text-rose-500 hover:text-rose-700' />
          </button>
          <button className='rounded border p-1 hover:border-secondary-500 '>
            <HiMinus className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
