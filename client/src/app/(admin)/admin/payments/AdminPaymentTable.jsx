import { adminPaymentsTableHeads } from '@/constants/tableHeads';
import { toLocalDateStringShort } from '@/utils/toLocalDate';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';
import Link from 'next/link';
import { HiEye } from 'react-icons/hi2';

const AdminPaymentTable = ({ payments }) => {
  return (
    <div className='my-8 overflow-auto shadow-sm'>
      <table className='w-full min-w-[800px] table-auto border-collapse'>
        <thead>
          <tr>
            {adminPaymentsTableHeads.map((item) => {
              return (
                <th
                  className='table__th whitespace-nowrap text-center'
                  key={item.id}
                >
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => {
            return (
              <tr key={payment._id}>
                <td className='table__td'>{toPersianNumbers(index + 1)}</td>
                <td className='table__td'>
                  {toPersianNumbers(payment.invoiceNumber)}
                </td>
                <td className='table__td'>
                  {toLocalDateStringShort(payment.createdAt)}
                </td>
                <td className='table__td'>
                  <div className='flex flex-col items-center justify-center gap-y-1'>
                    <p>{payment.user.name}</p>
                    <p>{payment.user.email}</p>
                    <p>{payment.user.phoneNumber}</p>
                  </div>
                </td>

                <td className='table__td'>
                  <div className='flex flex-col gap-y-2 text-xs lg:text-sm'>
                    {payment.cart.productDetail.map((product) => {
                      return (
                        <p className='badge badge--secondary' key={product._id}>
                          {product.title}
                        </p>
                      );
                    })}
                  </div>
                </td>
                <td className='table__td'>
                  {toPersianNumbersWithComma(payment.amount)}
                </td>

                <td className='table__td'>
                  {payment.status === 'COMPLETED' ? (
                    <span className='badge badge--success'>موفق</span>
                  ) : (
                    <span className='badge badge--error'>ناموفق</span>
                  )}
                </td>

                <td className='table__td max-w-[280px] truncate'>
                  {payment.description}
                </td>

                <td className='table__td'>
                  <Link
                    href={`/admin/payments/${payment._id}`}
                    className=' flex items-center justify-center text-blue-600 transition-all duration-200 hover:text-blue-800 '
                  >
                    <HiEye className='h-6 w-6 text-primary-900 hover:text-primary-700' />
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

export default AdminPaymentTable;
