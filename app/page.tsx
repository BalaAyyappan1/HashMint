

import Footer  from '@/components/Footer';
import Hero from '@/components/Home/Hero';
import HorizontalScrollAnimation from '@/components/Home/Text';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <HorizontalScrollAnimation />
      <Footer />
    </div>
  );
}
