'use client';
import { logout } from '@/services/authServices';
import Link from 'next/link';

const Sidebar = () => {
  const handlerLogout = async (e) => {
    await logout();
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('token');
    document.location.href = '/';
  };

  return (
    <div>
      <ul className='flex flex-col space-y-6'>
        <li className='p-2 hover:rounded-xl hover:bg-blue-200'>
          <Link className='block' href='/'>
            صفحه اصلی
          </Link>
        </li>
        <li className='p-2 hover:rounded-xl hover:bg-blue-200'>
          <Link className='block' href='/profile'>
            داشبورد
          </Link>
        </li>
        <li className='p-2 hover:rounded-xl hover:bg-blue-200'>
          <Link className='block' href='/profile/me'>
            اطلاعات کاربری
          </Link>
        </li>
        <li className='p-2 hover:rounded-xl hover:bg-blue-200'>
          <Link className='block' href='/profile/payments'>
            سفارشات
          </Link>
        </li>
        <li className='p-2 text-red-500'>
          <button onClick={handlerLogout} type='button' className=''>
            خروج از حساب کاربری
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
