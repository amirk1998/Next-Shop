'use client';
import { useGetUser } from '@/hooks/useAuth';
import Link from 'next/link';

const Header = () => {
  const { data, error, isLoading } = useGetUser();

  const { user, cart } = data || {};

  console.log({ data, error, isLoading });

  return (
    <header
      className={`sticky top-0 mb-10 shadow-md transition-all duration-300 ${
        isLoading ? 'opacity-70 blur-sm' : 'opacity-100 blur-0'
      }`}
    >
      <nav>
        <ul className='container flex items-center justify-between py-2 xl:max-w-screen-xl'>
          <li>
            <Link className='block py-2' href='/'>
              خانه
            </Link>
          </li>
          <li>
            <Link className='block py-2' href='/products'>
              محصولات
            </Link>
          </li>
          <li>
            <Link className='block py-2' href='/cart'>
              سبد خرید ({cart ? <span>{cart.productDetail.length}</span> : 0})
            </Link>
          </li>

          {user ? (
            <span>{user.name}</span>
          ) : (
            <li>
              <Link className='block py-2' href='/auth'>
                ورود
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
