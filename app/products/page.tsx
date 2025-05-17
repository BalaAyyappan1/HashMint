import Footer from '@/components/Footer'
import Hero from '@/components/Products/Hero'

import TopNav from '@/components/TopNav'
import React from 'react'
import ImageCarousel from '@/components/Products/ImageCarousel'
import Clientele from '@/components/Products/Clientele'
import Specs from '@/components/Products/Specs'


const page = () => {
    return (
        <div>
            <Hero />
            <ImageCarousel />
            <Clientele />
          <Specs />
  <Footer />
        </div>
    )
}

export default page
