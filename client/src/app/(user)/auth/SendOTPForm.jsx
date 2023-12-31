import LoadingButton from '@/common/LoadingButton';
import TextField from '@/common/TextField';

const SendOTPForm = ({ phoneNumber, onChange, onSubmit, isLoading }) => {
  return (
    <div>
      <form className='space-y-10' onSubmit={onSubmit}>
        <TextField
          label='شماره موبایل'
          name='phoneNumber'
          value={phoneNumber}
          onChange={onChange}
          dir='ltr'
        />
        {isLoading ? (
          <LoadingButton isWidthFull={true} />
        ) : (
          <button type='submit' className='btn btn--primary w-full'>
            ارسال کد تایید
          </button>
        )}
      </form>
    </div>
  );
};

export default SendOTPForm;
