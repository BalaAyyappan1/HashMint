

import { Footer2 } from '@/components/Footer2';
import Hero from '@/components/Home/Hero';
import HorizontalScrollAnimation from '@/components/Home/Text';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <HorizontalScrollAnimation />
      <Footer2 />
    </div>
  );
}
