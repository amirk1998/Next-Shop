'use client';
import { couponsTableHeads } from '@/constants/tableHeads';
import { useRemoveCoupon } from '@/hooks/useCoupon';
import { toLocalDateStringShort } from '@/utils/toLocalDate';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { HiEye, HiTrash } from 'react-icons/hi2';
import { RiEdit2Line } from 'react-icons/ri';

const CouponsTable = ({ coupons }) => {
  const { mutateAsync } = useRemoveCoupon();
  const queryClient = useQueryClient();

  const handlerRemoveCoupon = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['get-coupons'] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className='my-8 overflow-auto shadow-sm'>
      <table className='w-full min-w-[800px] table-auto border-collapse'>
        <thead>
          <tr>
            {couponsTableHeads.map((item) => {
              return (
                <th className='table__th whitespace-nowrap' key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => {
            return (
              <tr key={coupon._id}>
                <td className='table__td'>{toPersianNumbers(index + 1)}</td>
                <td className='table__td truncate whitespace-nowrap font-bold'>
                  {coupon.code}
                </td>
                <td className='table__td'>
                  <span className='badge badge--primary'>{coupon.type}</span>
                </td>
                <td className='table__td'>
                  {toPersianNumbersWithComma(coupon.amount)}
                </td>
                <td className='table__td'>
                  <div className='flex flex-col items-center gap-y-2'>
                    {coupon.productIds.map((product) => {
                      return (
                        <span
                          key={product._id}
                          className='badge badge--secondary'
                        >
                          {product.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className='table__td'>
                  {toPersianNumbers(coupon.usageCount)}
                </td>
                <td className='table__td'>
                  {toPersianNumbers(coupon.usageLimit)}
                </td>
                <td className='table__td'>
                  {toLocalDateStringShort(coupon.expireDate)}
                </td>
                <td className='table__td'>
                  <div className='flex items-center justify-center gap-x-4'>
                    <Link href={`/admin/coupons/${coupon._id}`}>
                      <HiEye className='h-6 w-6 text-primary-900 hover:text-primary-700' />
                    </Link>
                    <button onClick={() => handlerRemoveCoupon(coupon._id)}>
                      <HiTrash className='h-6 w-6 text-rose-600 hover:text-rose-800' />
                    </button>
                    <Link href={`/admin/coupons/edit/${coupon._id}`}>
                      <RiEdit2Line className='h-6 w-6 text-secondary-600 hover:text-secondary-800' />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CouponsTable;
