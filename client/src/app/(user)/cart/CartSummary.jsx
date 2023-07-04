import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';

const CartSummary = ({ payDetail }) => {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;

  return (
    <div className='rounded-xl border border-secondary-300 p-4 shadow-md'>
      <p className='mb-4 font-bold'>اطلاعات پرداخت</p>
      <div className='mb-4 flex items-center justify-between'>
        <span>جمع کل : </span>
        <span>{toPersianNumbersWithComma(totalGrossPrice)}</span>
      </div>
      <div className='mb-4 flex items-center justify-between'>
        <span>تخفیف : </span>
        {totalOffAmount > 0 ? (
          <span> {toPersianNumbersWithComma(totalOffAmount)}- </span>
        ) : (
          toPersianNumbers(0)
        )}
      </div>
      <div className='mb-6 flex items-center justify-between font-bold'>
        <span>مبلغ قابل پرداخت : </span>
        <span>{toPersianNumbersWithComma(totalPrice)}</span>
      </div>
      <button className='btn btn--primary w-full'>ثبت سفارش</button>
    </div>
  );
};

export default CartSummary;
