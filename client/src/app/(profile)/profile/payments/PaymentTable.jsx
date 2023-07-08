import { userPaymentsTHeads } from '@/constants/tableHeads';
import { toLocalDateStringShort } from '@/utils/toLocalDate';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';

const PaymentTable = ({ payments, isDesc = true }) => {
  return (
    <div className='my-8 overflow-auto shadow-sm'>
      <table className='w-full min-w-[800px] table-auto border-collapse'>
        <thead>
          {isDesc ? (
            <tr>
              {userPaymentsTHeads.map((item) => {
                return (
                  <th className='table__th whitespace-nowrap' key={item.id}>
                    {item.label}
                  </th>
                );
              })}
            </tr>
          ) : (
            <tr>
              {userPaymentsTHeads.slice(0, 6).map((item) => {
                return (
                  <th className='table__th whitespace-nowrap' key={item.id}>
                    {item.label}
                  </th>
                );
              })}
            </tr>
          )}
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
                {isDesc && (
                  <td className='table__td max-w-[280px] truncate'>
                    {payment.description}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
