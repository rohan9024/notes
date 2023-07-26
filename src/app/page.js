import Image from 'next/image'
import { Inter, Manrope, Raleway } from 'next/font/google';
import Homepage from '../../components/Homepage';

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const manrope = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <Homepage />


  )
}
