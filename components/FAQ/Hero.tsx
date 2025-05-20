import React from 'react'
import TopNav from '../TopNav'
import Image from 'next/image'
const Hero = () => {

    const contents = [
        {
            name: 'Order',
            image: '/order1.svg'
        },
        {
            name: 'Device',
            image: '/device.svg'
        },
        {
            name: 'Software',
            image: '/software.svg'
        },
        {
            name: 'Comapny',
            image: '/company.svg'
        },


    ]


    return (
      <div>
        <div className="fixed w-full z-20  ">
          <TopNav />
        </div>

        <div className="flex flex-col max-w-[1200px] mx-auto pt-30 bg-[#FAF5F2]">
          <div className="flex md:flex-row flex-col space-y-5 items-center justify-between md:px-0 px-5">
            <div className="text-7xl ">
              Frequently <br /> Asked Questions
            </div>
            <p className="text-md font-medium justify-center text-[#4B4C47]">
              Welcome to Daylight Support! We're happy to help. Please check{" "}
              <br /> the FAQs to see if your question is answered, and if not,
              feel free to <br />
              email or text our support team.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10  max-w-4xl md:px-0 px-10">
  {contents.map((item, index) => {
    return (
      <div
        className="flex flex-col items-center bg-[#E7DDD6] rounded-2xl p-5 w-full md:h-[250px] h-[220px]"
        key={index}
      >
        <div className="text-lg sm:text-xl md:text-2xl text-center mb-5">
          {item.name}
        </div>
        <Image
          src={item.image}
          alt={item.name}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-35 transition-all duration-300 hover:grayscale hover:brightness-55 hover:opacity-50"
          width={100}
          height={100}
        />
      </div>
    );
  })}
</div>


          <div className="mt-10 mb-20">
            <hr
              className="border-t border-transparent my-4"
              style={{
                borderImage:
                  "repeating-linear-gradient(90deg, black, black 3px, transparent 3px, transparent 8px) 1",
                height: "1px",
              }}
            />

            <div className="flex md:flex-row flex-col justify-between space-y-5  items-center md:mt-10 md:mb-10 ">
              <div className="text-2xl md:w-[500px] w-full md:px-0 px-4 md:text-start text-center  ">
              We genuinely appreciate your feedback! Whether you have a great idea or need help with something, we’re all ears and happy to hear from you.
              </div>
              <div className="flex flex-col  md:text-start text-center">
              <p className="text-xl text-[#535450] font-regular">Feel free to contact us:</p>
                <p className="text-xl text-[#535450] font-regular">Email: <span className='underline'>jimmy@hashmint.tech               </span></p>
                <p className="text-xl text-[#535450] font-regular">Text: <span className='underline'>+91 98715 47671</span></p>

              </div>
              <button className="md:px-15 px-30 py-3 rounded-lg bg-[#f9c63b] whitespace-nowrap cursor-pointer font-regular">
                Book a call
              </button>
            </div>

            <hr
              className="border-t border-transparent my-4"
              style={{
                borderImage:
                  "repeating-linear-gradient(90deg, black, black 3px, transparent 3px, transparent 8px) 1",
                height: "1px", // Adjust thickness of the line
              }}
            />
          </div>
        </div>
      </div>
    );
}

export default Hero
