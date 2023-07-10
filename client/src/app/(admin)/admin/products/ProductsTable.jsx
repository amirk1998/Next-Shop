'use client';
import { productsTableHeads } from '@/constants/tableHeads';
import { useRemoveProduct } from '@/hooks/useProducts';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { HiEye, HiTrash } from 'react-icons/hi2';
import { RiEdit2Line } from 'react-icons/ri';

const ProductsTable = ({ products }) => {
  const { mutateAsync } = useRemoveProduct();
  const queryClient = useQueryClient();

  const handlerRemoveProduct = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['get-products'] });
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
            {productsTableHeads.map((item) => {
              return (
                <th className='table__th whitespace-nowrap' key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product._id}>
                <td className='table__td'>{toPersianNumbers(index + 1)}</td>
                <td className='table__td truncate whitespace-nowrap font-bold'>
                  {product.title}
                </td>
                <td className='table__td'>
                  <span className='badge badge--secondary'>
                    {product.category.title}
                  </span>
                </td>
                <td className='table__td'>
                  {toPersianNumbersWithComma(product.price)}
                </td>
                <td className='table__td'>
                  {toPersianNumbersWithComma(product.discount)} %
                </td>
                <td className='table__td font-semibold'>
                  {toPersianNumbersWithComma(product.offPrice)}
                </td>
                <td className='table__td'>
                  {toPersianNumbers(product.countInStock)}
                </td>
                <td className='table__td'>
                  <div className='flex items-center justify-center gap-x-4'>
                    <Link href={`/admin/products/${product._id}`}>
                      <HiEye className='h-6 w-6 text-primary-900 hover:text-primary-700' />
                    </Link>
                    <button onClick={() => handlerRemoveProduct(product._id)}>
                      <HiTrash className='h-6 w-6 text-rose-600 hover:text-rose-800' />
                    </button>
                    <Link href={`/admin/products/edit/${product._id}`}>
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

export default ProductsTable;
