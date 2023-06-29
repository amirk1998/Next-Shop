import Link from 'next/link';

const Sidebar = () => {
  return (
    <div>
      <ul className='flex flex-col space-y-8'>
        <li>
          <Link href='/'> صفحه اصلی</Link>
        </li>
        <li>
          <Link href='/me'> اطلاعات کاربری </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
