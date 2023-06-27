import Header from './Header';
import './globals.css';
import vazirFont from '@/constants/localFonts';

export const metadata = {
  title: 'Next Shop Panel',
  description: 'Next.js Advanced Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`${vazirFont.variable} font-sans`}>
        <Header />
        <div className='container xl:max-w-screen-xl'>{children}</div>
      </body>
    </html>
  );
}
