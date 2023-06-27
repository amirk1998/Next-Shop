'use client';
import { useState } from 'react';
import SendOTPForm from './SendOTPForm';
import http from '@/services/httpService';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { getOTP } from '@/services/authServices';

const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const { data, error, isLoading, mutateAsync } = useMutation({
    mutationFn: getOTP,
  });

  const handlerPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlerSendOTP = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ phoneNumber });
      toast.success(data?.message);
    } catch (error) {
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
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AuthPage;
