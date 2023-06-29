import toastOptions from '@/utils/toastOptions';
import Providers from '../../Providers';
import '../../globals.css';
import vazirFont from '@/constants/localFonts';
import { Toaster } from 'react-hot-toast';

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
          <div className='container xl:max-w-screen-xl'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
