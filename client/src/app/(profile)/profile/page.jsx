'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth';
import { toLocalDateString } from '@/utils/toLocalDate';

const Profile = () => {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  if (isLoading)
    return (
      <div className='inline-flex items-center'>
        {/* <h1 className='mb-6 text-4xl font-bold'>صفحه پروفایل کاربر</h1> */}
        {/* <span>Loading...</span> */}
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      <h1 className='mb-6 text-3xl font-semibold'>{user.name} خوش آمدی !</h1>
      <p>تاریخ پیوستن : {toLocalDateString(user.createdAt)}</p>
    </div>
  );
};

export default Profile;
