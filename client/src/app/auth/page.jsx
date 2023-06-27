'use client';
import { useState } from 'react';
import SendOTPForm from './SendOTPForm';
import http from '@/services/httpService';
import { toast } from 'react-hot-toast';

const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlerPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlerSendOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await http.post('/user/get-otp', { phoneNumber });
      console.log(data?.data);
      toast.success(data?.data?.message);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='w-full sm:max-w-sm'>
        <SendOTPForm
          phoneNumber={phoneNumber}
          onChange={handlerPhoneNumber}
          onSubmit={handlerSendOTP}
        />
      </div>
    </div>
  );
};

export default AuthPage;
