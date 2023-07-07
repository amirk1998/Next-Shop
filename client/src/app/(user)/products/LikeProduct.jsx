'use client';

import { likeProduct } from '@/services/productService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { HiOutlineHeart } from 'react-icons/hi2';

const LikeProduct = ({ product }) => {
  const router = useRouter();

  const handlerLike = async (e) => {
    try {
      const { message } = await likeProduct(product._id);
      toast.success(message);
      router.refresh();
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <button onClick={handlerLike}>
        {product.isLiked ? (
          <HiOutlineHeart className='h-6 w-6 fill-red-500 text-center text-red-500 ' />
        ) : (
          <HiOutlineHeart className='h-6 w-6 text-center text-red-500 ' />
        )}
      </button>
    </div>
  );
};

export default LikeProduct;
