const CartSummary = ({ payDetail }) => {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;

  return (
    <div className='rounded-xl border p-2'>
      <p className='mb-4 font-bold'>اطلاعات پرداخت</p>
      <div className='mb-4 flex items-center justify-between'>
        <span>جمع کل : </span>
        <span>{totalGrossPrice}</span>
      </div>
      <div className='mb-4 flex items-center justify-between'>
        <span>تخفیف : </span>
        <span>{totalOffAmount}-</span>
      </div>
      <div className='mb-6 flex items-center justify-between font-bold'>
        <span>مبلغ قابل پرداخت : </span>
        <span>{totalPrice}</span>
      </div>
      <button className='btn btn--primary w-full'>ثبت سفارش</button>
    </div>
  );
};

export default CartSummary;
