import Header from './Header';
import Providers from './Providers';
import './globals.css';
import vazirFont from '@/constants/localFonts';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Next Shop Panel',
  description: 'Next.js Advanced Project',
};

const toastOptions = {
  success: {
    duration: 3000,
    style: {
      background: '#22c55e',
      color: '#fff',
    },
  },
  error: {
    duration: 3000,
    style: {
      background: '#ef4444',
      color: '#fff',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`${vazirFont.variable} font-sans`}>
        <Toaster position='top-center' toastOptions={toastOptions} />
        <Header />
        <div className='container xl:max-w-screen-xl'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
