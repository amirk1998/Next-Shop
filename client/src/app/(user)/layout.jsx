import Header from './Header';
import Providers from '../Providers';
import '../globals.css';
import vazirFont from '@/constants/localFonts';
import { Toaster } from 'react-hot-toast';
import toastOptions from '@/utils/toastOptions';

export const metadata = {
  title: 'Shop Next Panel',
  description: 'Next.js Advanced Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster position='top-center' toastOptions={toastOptions} />
          <Header />
          <div className='container xl:max-w-screen-xl'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
