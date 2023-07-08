import { productsTableHeads } from '@/constants/tableHeads';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';
import Link from 'next/link';

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
                  <Link
                    className='text-blue-600 transition-all duration-300 hover:text-blue-800'
                    href={`/admin/products/${product._id}`}
                  >
                    مشاهده جزئیات
                  </Link>
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
