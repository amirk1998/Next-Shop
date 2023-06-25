import './globals.css';
import vazirFont from '@/constants/localFonts';

export const metadata = {
  title: 'Next Shop Panel',
  description: 'Next.js Advanced Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${vazirFont.variable} font-sans`}>{children}</body>
    </html>
  );
}
