import toastOptions from '@/utils/toastOptions';
import Providers from '../../Providers';
import '../../globals.css';
import vazirFont from '@/constants/localFonts';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from './AdminSidebar';

export const metadata = {
  title: 'پروفایل ادمین',
  description: 'پروفایل ادمین',
};

export default function RootLayout({ children }) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster position='top-center' toastOptions={toastOptions} />
          <div className='grid h-screen grid-cols-4 bg-white'>
            <div className='col-span-1 overflow-y-auto bg-gray-100 p-4'>
              <AdminSidebar />
            </div>
            <div className='col-span-3 overflow-y-auto p-4'>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
