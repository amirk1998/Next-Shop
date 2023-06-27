import Link from 'next/link';

const Header = () => {
  return (
    <header className='mb-10 shadow-md'>
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
            <Link className='block py-2' href='/auth'>
              ورود
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
