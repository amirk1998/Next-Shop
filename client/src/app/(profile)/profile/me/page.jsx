'use client';

import LoadingSpinner from '@/common/Loading';
import TextField from '@/common/TextField';
import { useGetUser } from '@/hooks/useAuth';
import { includeObj } from '@/utils/objectUtils';
import { useEffect, useState } from 'react';

const MyProfilePage = () => {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};

  const includesKey = ['name', 'email', 'phoneNumber', 'biography'];
  const [formData, setFormData] = useState({});

  // if (user) {
  //   console.log(Object.keys(includeObj(user, includesKey)));
  //   console.log(includeObj(user, includesKey));
  // }

  useEffect(() => {
    if (user) setFormData(includeObj(user, includesKey));
  }, [user]);

  if (isLoading)
    return (
      <div className='container sm:max-w-screen-sm'>
        <div className='text-center'>
          <LoadingSpinner />
        </div>
      </div>
    );

  console.log(formData);

  return (
    <div className='container sm:max-w-screen-sm'>
      <h1 className='mb-6 text-3xl font-semibold'> اطلاعات کاربری</h1>

      <form className='space-y-6'>
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
                dir='ltr'
              />
            );
          })}
      </form>
    </div>
  );
};

export default MyProfilePage;
