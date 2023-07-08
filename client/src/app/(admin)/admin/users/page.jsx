'use client';

import LoadingSpinner from '@/common/Loading';
import { useGetAllUser } from '@/hooks/useAuth';
import UsersTable from './UsersTable';

const UsersPage = () => {
  const { data, isLoading } = useGetAllUser();
  const { users } = data || {};

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className='text-4xl font-bold'>اطلاعات کاربران</h1>
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;
