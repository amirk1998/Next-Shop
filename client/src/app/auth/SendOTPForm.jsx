import TextField from '@/common/TextField';

const SendOTPForm = ({ phoneNumber, onChange }) => {
  return (
    <div>
      <form>
        <TextField
          label='شماره موبایل'
          name='phoneNumber'
          value={phoneNumber}
          onChange={onChange}
          dir='ltr'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default SendOTPForm;
