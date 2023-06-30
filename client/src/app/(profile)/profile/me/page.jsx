'use client';

import LoadingSpinner from '@/common/Loading';
import LoadingButton from '@/common/LoadingButton';
import TextField from '@/common/TextField';
import { useGetUser } from '@/hooks/useAuth';
import { updateUserProfile } from '@/services/authServices';
import { includeObj } from '@/utils/objectUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const MyProfilePage = () => {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateUserProfile,
  });

  const includesKey = ['name', 'email', 'phoneNumber', 'biography'];
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) setFormData(includeObj(user, includesKey));
  }, [user]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading)
    return (
      <div className='container sm:max-w-screen-sm'>
        <div className='text-center'>
          <LoadingSpinner />
        </div>
      </div>
    );

  return (
    <div className='container sm:max-w-screen-sm'>
      <h1 className='mb-6 text-3xl font-semibold'> اطلاعات کاربری</h1>

      <form onSubmit={handlerSubmit} className='space-y-6'>
        {user &&
          Object.keys(includeObj(user, includesKey)).map((key) => {
            return (
              <TextField
                label={key}
                name={key}
                key={key}
                value={formData[key] || ''}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            );
          })}

        {isLoading ? (
          <LoadingButton />
        ) : (
          <button type='submit' className='btn btn--primary w-full'>
            تایید
          </button>
        )}
      </form>
    </div>
  );
};

export default MyProfilePage;
