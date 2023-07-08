'use client';
import { logout } from '@/services/authServices';
import Link from 'next/link';

const AdminSidebar = () => {
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
        <li className='sidebar__li'>
          <Link className='block' href='/'>
            صفحه اصلی
          </Link>
        </li>
        <li className='sidebar__li'>
          <Link className='block' href='/admin'>
            داشبورد
          </Link>
        </li>
        <li className='sidebar__li'>
          <Link className='block' href='/admin/users'>
            کاربران
          </Link>
        </li>
        <li className='sidebar__li'>
          <Link className='block' href='/admin/products'>
            محصولات
          </Link>
        </li>
        <li className='sidebar__li'>
          <Link className='block' href='/admin/categories'>
            دسته بندی
          </Link>
        </li>
        <li className='sidebar__li'>
          <Link className='block' href='/admin/payments'>
            سفارشات
          </Link>
        </li>
        <li className='sidebar__li'>
          <Link className='block' href='/admin/coupons'>
            کد تخفیف
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

export default AdminSidebar;
