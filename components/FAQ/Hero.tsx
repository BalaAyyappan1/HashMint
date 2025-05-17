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
        <div className="fixed w-full z-20 ">
          <TopNav />
        </div>

        <div className="flex flex-col max-w-[1200px] mx-auto pt-30">
          <div className="flex flex-row justify-between  items-end">
            <div className="text-5xl font-bold">
              Frequently <br /> Asked Questions
            </div>
            <p className="text-xl">
              Welcome to Daylight Support! We're happy to help. Please check{" "}
              <br /> the FAQs to see if your question is answered, and if not,
              feel free to <br />
              email or text our support team.
            </p>
          </div>

          <div className="flex flex-row space-x-5 mt-15 pl-5">
            {contents.map((item, index) => {
              return (
                <div
                  className="flex flex-col pt-7 items-center w-60 h-70   bg-[#E7DDD6] rounded-2xl"
                  key={index}
                >
                  <div className="text-2xl text-center mb-10">{item.name}</div>
                  <Image
                    src={item.image}
                    alt="hero"
                    className="w-30 h-30 opacity-35 transition-all duration-300 hover:text-red-500 hover:grayscale hover:brightness-55 hover:opacity-50"

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

            <div className="flex flex-row justify-between items-start mt-10 mb-10 ">
              <div className="text-xl ">
                We love feedback, so don't hesitate to write <br /> to us with
                ideas or issues you're having.
              </div>
              <div className="flex flex-col ">
                <p className="text-xl ">Email: hello@daylightcomputer.com</p>
                <p className="text-xl ">Text: +1 (415) 599-1668 Press</p>
                <p className="text-xl ">inquiries: press@daylightcomputer.com</p>
              </div>
              <button className="px-5 py-3 rounded-lg bg-[#f9c63b] whitespace-nowrap">
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
