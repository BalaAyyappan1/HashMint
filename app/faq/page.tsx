import Faq from '@/components/FAQ/Faq'

import Hero from '@/components/FAQ/Hero'
import { Footer2 } from '@/components/Footer2';


import React from 'react'


const page = () => {
  return (
    <div className="bg-[#FAF5F2]">
      <Hero />
      <Faq />
      <Footer2 />
    </div>
  );
}

export default page
