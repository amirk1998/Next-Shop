'use client';
import { couponsTableHeads } from '@/constants/tableHeads';
import { toLocalDateStringShort } from '@/utils/toLocalDate';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';

const CouponsTable = ({ coupons }) => {
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

                {/* <td className='table__td'>
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
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CouponsTable;
