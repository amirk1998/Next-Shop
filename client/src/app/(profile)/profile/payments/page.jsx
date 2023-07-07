'use client';
import LoadingSpinner from '@/common/Loading';
import { userPaymentsTHeads } from '@/constants/tableHeads';
import { useGetUser } from '@/hooks/useAuth';
import { toLocalDateStringShort } from '@/utils/toLocalDate';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';

const PaymentPage = () => {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h1 className='mb-6 text-3xl font-semibold'>سفارشات</h1>
      <table className='w-full min-w-[800px] table-auto border-collapse'>
        <thead>
          <tr>
            {userPaymentsTHeads.map((item) => {
              return (
                <th className='table__th whitespace-nowrap' key={item.id}>
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
                  <div className='flex flex-col gap-y-2 text-xs lg:text-sm'>
                    {payment.cart.productDetail.map((product) => {
                      return (
                        <p
                          className='whitespace-nowrap rounded-xl bg-secondary-600 px-2 py-0.5 text-white'
                          key={product._id}
                        >
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
                    <span className='rounded-lg bg-green-600 px-2 py-0.5 text-white'>
                      موفق
                    </span>
                  ) : (
                    <span className='rounded-lg bg-green-600 px-2 py-0.5 text-white'>
                      ناموفق
                    </span>
                  )}
                </td>
                <td className='table__td'>{payment.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentPage;
