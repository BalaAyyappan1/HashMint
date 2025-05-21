import Footer from '@/components/Footer'
import Hero from '@/components/Products/Hero'
import React from 'react'
import ImageCarousel from '@/components/Products/ImageCarousel'

import Specs from '@/components/Products/Specs'




const page = () => {
    return (
        <div>
            <Hero />
            <div className='mt-20 mb-30'>
            <ImageCarousel />

            </div>

            {/* <Clientele /> */}
          <Specs />
  <Footer />
        </div>
    )
}

export default page
