import LoadingButton from '@/common/LoadingButton';
import { createPayment } from '@/services/paymentService';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const CartSummary = ({ payDetail }) => {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;

  const { isLoading, mutateAsync } = useMutation({ mutationFn: createPayment });

  const handlerCreatePayment = async (e) => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

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
      {isLoading ? (
        <LoadingButton isWidthFull={true} />
      ) : (
        <button
          onClick={handlerCreatePayment}
          className='btn btn--primary w-full'
        >
          ثبت سفارش
        </button>
      )}
    </div>
  );
};

export default CartSummary;
