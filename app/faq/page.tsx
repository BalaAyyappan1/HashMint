import Faq from '@/components/FAQ/Faq'

import Hero from '@/components/FAQ/Hero'
import New from '@/components/FAQ/Faq'


import Footer from '@/components/Footer'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#FAF5F2]'>
      <Hero />
      <Faq />
  <New />
      
    </div>
  )
}

export default page
