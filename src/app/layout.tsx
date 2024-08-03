import type { Metadata } from 'next';
import { Poppins} from 'next/font/google';
import './globals.scss';

const poppinsFont = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tabz',
  description: 'A free, minimal, simple business management platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppinsFont.className}>{children}</body>
    </html>
  );
}
