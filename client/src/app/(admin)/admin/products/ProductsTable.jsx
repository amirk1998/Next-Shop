import { productsTableHeads } from '@/constants/tableHeads';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';
import Link from 'next/link';
import { HiEye, HiTrash } from 'react-icons/hi2';
import { RiEdit2Line } from 'react-icons/ri';

const ProductsTable = ({ products }) => {
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
                    <button>
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
