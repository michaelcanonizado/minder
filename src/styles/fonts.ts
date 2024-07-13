import { Poppins as FontSans } from 'next/font/google';

export const fontSans = FontSans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin-ext'],
  variable: '--font-sans'
});
