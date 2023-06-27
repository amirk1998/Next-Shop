import OtpInput from 'react-otp-input';

const CheckOTPForm = ({
  otp,
  setOtp,
  otpResponse,
  time,
  onSubmit,
  onBack,
  onResendOTP,
}) => {
  return (
    <div>
      <button onClick={onBack} className='mb-4'>
        برگشت
      </button>
      {otpResponse && (
        <p>
          {otpResponse.message}
          <button onClick={onBack}>ویرایش ؟</button>
        </p>
      )}
      <div className='mb-4'>
        {time > 0 ? (
          <p> {time} ثانیه تا ارسال مجدد کد </p>
        ) : (
          <button onClick={onResendOTP}>ارسال مجدد کد ؟</button>
        )}
      </div>
      <form className='space-y-10' onSubmit={onSubmit}>
        <p>کد تایید را وارد کنید</p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          inputStyle={{
            width: '2.5rem',
            padding: '0.5rem 0.2rem',
            border: '1px solid rgb(var(--color-primary-300))',
            borderRadius: '0.5rem',
          }}
          containerStyle='flex flex-row-reverse gap-x-2 justify-center'
          renderInput={(props) => <input type='number' {...props} />}
        />
        <button type='submit' className='btn btn--primary w-full'>
          تایید
        </button>
      </form>
    </div>
  );
};

export default CheckOTPForm;
