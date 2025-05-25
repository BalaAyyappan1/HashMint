'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { contents, Glance, images, mobileContents, NewSectionContent, RightSectionContents, section6Contents, TestimonialContents } from "./contents";
import Image from 'next/image';
import Hero from './Hero';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLDivElement | null>(null);
  const text2Ref = useRef<HTMLDivElement | null>(null);
  const text3Ref = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const newSectionRef = useRef<HTMLDivElement | null>(null);
  const rightContentRef = useRef<HTMLDivElement | null>(null);
  const horizontalContainerRef = useRef<HTMLDivElement | null>(null);
  const horizontalContentRef = useRef<HTMLDivElement | null>(null);
  const testimonialContainerRef = useRef(null);
  const people1Ref = useRef(null);
  const people2Ref = useRef(null);
  const testimonialRef = useRef(null);
  const pinRef = useRef(null);

  //window type bug 
  let isMobile = false;
  if (typeof window !== 'undefined') {
    isMobile = window.innerWidth < 640;
  }


  useEffect(() => {
    if (
      !containerRef.current ||
      !heroRef.current ||
      !text1Ref.current ||
      !text2Ref.current ||
      !text3Ref.current ||
      !rightContentRef.current ||
      !imageRef.current ||
      !newSectionRef.current ||
      !testimonialRef.current ||
      !testimonialContainerRef.current ||
      !people1Ref.current ||
      !people2Ref.current ||
      !horizontalContainerRef.current ||
      !pinRef.current ||
      !horizontalContentRef.current
    ) {
      return;
    }

    const text1Spans = text1Ref.current.querySelectorAll('span');
    const text2Spans = text2Ref.current.querySelectorAll('span');
    const text3Spans = text3Ref.current.querySelectorAll('span');

    // Set initial styles
    gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      textAlign: 'center',
    });

    gsap.set(text1Spans, { opacity: 0, y: 20 });
    gsap.set(text2Spans, { opacity: 0, y: 20 });
    gsap.set(text2Ref.current, { opacity: 0 });
    gsap.set(text3Spans, { opacity: 0, y: 20 });
    gsap.set(text3Ref.current, { opacity: 0 });

    gsap.set(imageRef.current, {
      opacity: 0,
      scale: window.innerWidth < 640 ? 2 : 3.5, // Smaller scale on mobile
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    });

    gsap.set(horizontalContainerRef.current, {
      x: '100vw',
      opacity: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    });


    // Calculate content width dynamically for mobile and desktop
    const calculateContentWidth = () => {
      if (isMobile) {
        // Calculate total height of all sections
        const sections = horizontalContentRef.current?.children;
        if (!sections) return window.innerHeight * 12; // Fallback
        let totalHeight = 1200;
        Array.from(sections).forEach((section) => {
          totalHeight += section.getBoundingClientRect().height;
        });
        return totalHeight;
      } else {
        return (
          window.innerWidth + // First section
          window.innerWidth + // Second section
          1200 + // Third section
          1000 + // Fourth section
          window.innerWidth + // Fifth section
          1400 + // Sixth section
          window.innerWidth // Seventh section
        );
      }
    };

    const totalWidth = calculateContentWidth();

    gsap.set(horizontalContentRef.current, {
      width: totalWidth,
      display: 'flex',
      flexDirection: window.innerWidth < 640 ? 'column' : 'row', // Stack on mobile
    });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: window.innerWidth < 640 ? '+=800%' : '+=800%',
        scrub: 1,
        pin: true,

        pinSpacing: true,
        anticipatePin: 0,
        onLeave: () => {
          gsap.to(newSectionRef.current, {
            zIndex: 100,
            duration: 0
          });
        },
      },
    });


    // Text animations
    mainTl.to(text1Spans, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 1.5,
      ease: 'power2.out',
    });

    mainTl.to(
      text1Spans,
      {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.in',
      },
      '+=0.5'
    );

    mainTl.to(
      text2Ref.current,
      {
        opacity: 1,
        duration: 0.5,
        ease: 'none',
      },
      '+=0.5'
    );

    mainTl.to(text2Spans, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.5,

    });

    mainTl.to(
      horizontalContainerRef.current,
      {
        x: '0vw',
        opacity: 1,
        duration: 5,
        ease: 'power2.inOut',
      },

    );

    mainTl.to(
      [text1Ref.current, text2Ref.current],
      {
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
      },
      '-=1.5'
    );

    mainTl.to(horizontalContentRef.current, {
      x: window.innerWidth < 640 ? 0 : () => -(totalWidth - window.innerWidth),
      y: window.innerWidth < 640 ? () => -(totalWidth - window.innerHeight) : 0,
      ease: 'none',
      duration: window.innerWidth < 640 ? 50 : 50,
    });

    // Image and text3 animations adjusted for mobile
    mainTl.to(
      imageRef.current,
      {
        x: "0%",
        y: "0%",
        left: "50%",
        top: "50%",
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        transformOrigin: 'center center',
      },
      '-=3'
    );

    mainTl.to(rightContentRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    }, '-=3');

    mainTl.to(
      text3Ref.current,
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=2.5'
    );

    mainTl.to(text3Spans, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 2,
      ease: 'power2.out',
    });

    mainTl.to(imageRef.current, {
      x: "0%",
      y: "0%",
      left: "50%",
      top: "50%",
      opacity: 1,
      duration: 2,
      transformOrigin: 'center center',
    }, '-=1');

    mainTl.to(imageRef.current, {
      x: "0%",
      y: "0%",
      left: "50%",
      top: window.innerWidth < 640 ? "50%" : "50%",
      opacity: 1,
      scale: window.innerWidth < 640 ? 2 : 1.2, // Scale up more on mobile
      duration: 2,
      ease: 'power2.inOut',
      transformOrigin: 'center center',
    });

    mainTl.to(
      text3Spans,
      {
        opacity: 0,
        stagger: 0.05,
        duration: 2,
        ease: 'power2.in',
      },
      '-=0.5'
    );

    mainTl.to(imageRef.current, {
      x: "0%",
      y: window.innerWidth < 640 ? "10%" : "0%", // Move to bottom -10% on mobile (y offset)
      left: window.innerWidth < 640 ? "50%" : "0%",
      top: window.innerWidth < 640 ? "90%" : "50%", // Position at bottom -10% on mobile
      scale: window.innerWidth < 640 ? 1.8 : 0.6, // Further scale up on mobile
      duration: 2,
      ease: 'power2.inOut',
      transformOrigin: 'center center',
    }, '+=0.5');

    gsap.set(rightContentRef.current, { opacity: 0, xPercent: 60 });
    mainTl.to(rightContentRef.current, {
      opacity: 1,
      xPercent: 0,
      duration: 3,
      ease: 'power3.out'
    }, '-=1');

    mainTl.to({}, { duration: 0.5 });
    // pin effec
    mainTl.to(pinRef.current, {

      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 0,

    }, '+=1')

    gsap.set(newSectionRef.current, {
      zIndex: -1,
    });

    ScrollTrigger.create({
      trigger: newSectionRef.current,
      start: 'bottom top',
      onEnter: () => {
        gsap.to(newSectionRef.current, {
          zIndex: 100,
          duration: 0
        });
      }
    });

    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: testimonialContainerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.from([people1Ref.current, people2Ref.current], {
        opacity: 1,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      const cards = gsap.utils.toArray('.testimonial-card');
      const cardHeight = 300;
      const gap = 10;
      const visibleHeight = window.innerHeight * 0.6;
      const totalScrollDistance = (cardHeight + gap) * cards.length - visibleHeight;

      tl.to(testimonialRef.current, {
        y: -totalScrollDistance,
        duration: cards.length * 0.3,
        ease: 'none',
      });

      (cards as HTMLElement[]).forEach((card, i) => {
        tl.from(card, {
          opacity: 0,
          y: 100,
          duration: 0.6,
          ease: 'back.out(1)',
        }, i * 0.2);
      });

      const exitPosition = cards.length * 0.6 * 0.8;

      tl.to(people1Ref.current, {
        x: -300,
        y: -80,
        opacity: 0,
        duration: 1.8,
        ease: "power1.inOut",
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: -150, y: -20 },
            { x: -300, y: -80 },
          ],
          curviness: 1.2,
        },
      }, exitPosition);

      tl.to(people2Ref.current, {
        x: 300,
        y: -80,
        opacity: 0,
        duration: 1.8,
        ease: "power1.inOut",
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 150, y: -20 },
            { x: 300, y: -80 },
          ],
          curviness: 1.2,
        },
      }, exitPosition);
    }


    const handleResize = () => {
      const width = window.innerWidth;
      gsap.set([text1Ref.current, text2Ref.current], {
        fontSize:
          width < 480
            ? '1.75rem' // Larger font size for very small screens
            : width < 640
              ? '3rem'   // Larger font size for mobile screens
              : width < 768
                ? '2.5rem' // Medium screens
                : '3.5rem', // Desktop screens
        width: '100%', // Ensure text wraps within the container
        whiteSpace: 'normal', // Allow text to wrap
        textAlign: 'center', // Center text
      });

      const contentWidth = calculateContentWidth();
      gsap.set(horizontalContentRef.current, {
        width: contentWidth,
        flexDirection: width < 640 ? 'column' : 'row',
      });

      ScrollTrigger.refresh(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const splitText = (text: string) =>
    text.split('').map((char, i) =>
      char === ' ' ? <span key={i}> </span> : <span key={i}>{char}</span>
    );

  return (
    <>
      <Image src="/Home/shadow.png" alt="banner" width={1000} height={1000} className="w-full h-full object-cover fixed top-0 left-0 " />
      <div ref={heroRef} className=''>
        <Hero />
      </div>
      <section
        ref={containerRef}
        className="h-screen w-full relative  overflow-hidden "
      >

        {/* <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" /> */}


        <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 relative">

          <div className="w-full mx-auto text-center relative h-32 sm:h-40">
            <div
              ref={text1Ref}
              className=" w-full font-horizona leading-tight tracking-tighter text-4xl sm:text-3xl md:text-5xl"
            >
              {splitText("We choose calm over chaos, \nclarity over distraction")}

            </div>
            <div
              ref={text2Ref}
              className="w-full font-horizona leading-tight tracking-tighter text-2xl sm:text-3xl md:text-5xl whitespace-nowrap"
            >
              {splitText(
                "Introducing Leaf 1 - a gentler, more mindful focus device."
              )}
            </div>
          </div>
        </div>

        <div
          ref={horizontalContainerRef}
          className="w-full h-full flex items-center justify-center md:justify-between overflow-hidden "
        >
          <div
            ref={horizontalContentRef}
            className="flex h-full items-center flex-nowrap sm:flex-row flex-col "
          >
            {/* First Section: Video */}
            <section className="horizontal-section w-screen flex-shrink-0  md:h-screen p-1 md:p-4 sm:p-5 bg-transparent flex flex-col items-center justify-center  text-lg sm:text-xl font-bold">
              <section className="video-section sticky top-0 h-[99vh] md:h-[95vh] w-full overflow-hidden">
                <video
                  autoPlay
                  muted
                  playsInline
                  webkit-playsinline="true"
                  x-webkit-airplay="allow"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  style={{
                    transform: "translateZ(0)",
                    willChange: "transform",
                    objectFit: "cover",
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <source
                    src="https://ik.imagekit.io/80lxmumju/hashmint/newvid.mp4?updatedAt=1747816545781"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Text positioned at top on mobile, bottom on desktop */}
                <div className="absolute flex flex-col sm:flex-row gap-8 sm:gap-[5%] top-[10%] md:top-[65%] px-6 sm:px-10 py-6 w-full">
                  <div className="z-20 w-full sm:w-1/2">
                    <h1 className="mt-6 sm:mt-0 text-3xl sm:text-4xl md:text-5xl text-start text-white leading-tight tracking-tighter font-sans">
                      Experience the first paper-like <br />
                      display with real-time speed.
                    </h1>
                  </div>

                  {/* Show contents on desktop only, at bottom */}
                  <div className="z-20 w-full sm:w-1/2 hidden sm:block">
                    <div className="flex flex-col sm:flex-row gap-3">
                      {contents.map((item, index) => (
                        <div
                          key={index}
                          className="horizontal-section flex flex-col items-start justify-center gap-4"
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={30}
                            height={30}
                          />
                          <h2 className="text-white text-sm sm:text-base tracking-tighter leading-tight font-bold">{item.title}</h2>
                          <p className="text-white text-xs sm:text-sm font-regular">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Contents displayed below video on mobile */}
              <div className="block sm:hidden bg-transparent px-6 py-10">
                <div className="flex flex-col gap-4">
                  {mobileContents.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-start justify-start gap-4 space-y-8"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={40}
                        height={40}
                      />
                      <div>
                        <h2 className="text-black text-base tracking-tighter leading-tight font-bold">{item.title}</h2>
                        <p className="text-black text-sm font-regular">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Second Section: Three Images */}
            <section className="horizontal-section w-screen h-screen flex-shrink-0 p-4 sm:p-5 flex md:flex-col flex-col-reverse justify-between text-lg sm:text-xl pt-10 mt-[120%] md:mt-0 sm:pt-24 pb-10 sm:pb-15 bg-transparent ">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-4 py-2 mt-4 w-full max-w-none">
                {images.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2"
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={500}
                      height={500}
                      className="object-cover rounded-2xl aspect-video w-full"
                      quality={100}
                    />

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full items-start leading-tight tracking-tighter md:gap-6 justify-between text-start">
                      <p className="text-sm sm:text-base font-semibold text-[#17190f] opacity-90 whitespace-nowrap">{feature.title}</p>
                      <p className="text-sm sm:text-base w-full sm:w-80 text-start opacity-70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-10 w-full">
                <h1 className="text-3xl sm:text-5xl leading-tight tracking-tighter font-horizona text-[#17190f]">
                  A focused, serene space that fosters <br /> focus & productivity.
                </h1>

                <div className="flex flex-col w-full sm:w-[30%] leading-tight tracking-tighter pt-4">
                  <h1 className="text-base sm:text-lg font-semibold text-[#17190f] opacity-70">Lume Paper Display</h1>
                  <p className="text-sm sm:text-base opacity-70">
                    Introducing the Lume Paper Display - a new kind of screen
                    that feels like paper but runs at 60fps. With Lume, enjoy
                    fluid work without distractions.
                  </p>
                </div>
              </div>
            </section>

            {/* Third Section: Single Image */}
            <section className="horizontal-section w-screen  bg-transparent h-screen flexed-shrink-0 p-4 md:pl-10 sm:p-0 flex flex-col  md:mt-0 items-center justify-center ">
              <Image
                src="https://ik.imagekit.io/80lxmumju/hashmint/DSC04657%20(2).jpg?updatedAt=1747817052725"
                alt="Lume Paper Display"
                width={500}
                height={500}
                className="h-1/2 md:h-screen  w-full md:w-3/4  object-cover  md:mt-0 rounded-2xl md:rounded-none"
              />
            </section>

            {/* Fourth Section: Rotating Image */}
            <section className="horizontal-section w-screen sm:w-[1000px]  md:h-screen flex-shrink-0 pt-4 sm:pt-5 bg-transparent flex flex-col items-center gap-10 md:mr-15 justify-between py-20">

              {/* <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  webkit-playsinline="true"
                  x-webkit-airplay="allow"
                  className="w-full h-full max-w-[200px] object-cover rounded-3xl"
                >
                  <source
                    src={'/Pen/pen-chrome.webm'}
                    type='video/webm'
                  />
                  <source
                    src={'/Pen/pen-safari.mov'}
                    type='video/mp4'
                  />
                  Your browser does not support the video tag.
                </video> */}

              <div className=' flex flex-col items-center justify-center gap-10'>

                <Image
                  src="/Pen/pen_rotation.gif"
                  alt="Pen Rotate"
                  width={200}
                  height={200}
                  className=" w-[200px]"
                />

                <svg width="44" height="12" viewBox="0 0 44 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50"><g><path d="M5.99871 12C9.31279 12 11.9994 9.31371 11.9994 6C11.9994 2.68629 9.31279 0 5.99871 0C2.68464 0 -0.00195312 2.68629 -0.00195312 6C-0.00195312 9.31371 2.68464 12 5.99871 12Z" fill="currentColor"></path><path d="M22.3459 0V6.3452H16C16.1808 9.50137 18.7948 12 21.9924 12C25.1901 12 28.0013 9.31233 28.0013 5.99178C28.0013 2.67123 25.5024 0.180822 22.3459 0Z" fill="currentColor"></path><path d="M40.212 0V8.21111H32C32.9583 10.436 35.1725 12 37.7501 12C41.2034 12 44.0013 9.20239 44.0013 5.74943C44.0013 3.1721 42.4427 0.958238 40.212 0Z" fill="currentColor"></path></g></svg>

              </div>



              <div className="text-center text-base sm:text-xl font-horizona leading-tight tracking-tighter text-[#17190f]">
                The vision behind the Hashmint is to create a healthier, more
                <br />
                human-centered digital environment - designed to protect your
                <br />
                attention, health and autonomy
              </div>
            </section>

            {/* Fifth Section: Built for Open Skies */}
            <section className="horizontal-section w-screen h-screen flex-shrink-0 relative bg-transparent">
              <Image
                src={isMobile ? "/pragya_mobile.png" : "/pragya.jpg"}
                alt="Lume Paper Display"
                fill
                className="object-cover z-0"
              />


              <div className="absolute flex flex-col sm:flex-row gap-4 sm:gap-[30%] w-full px-6 sm:px-10 md:top-20 sm:top-34">
                <div className="flex flex-col items-start justify-center z-10 text-white text-center px-4 mt-10 sm:mt-20">
                  <h1 className="text-4xl sm:text-6xl mb-4 font-horizona leading-tight tracking-tighter">
                    Built for <span className="italic">open skies</span>
                  </h1>
                  <p className="text-base sm:text-xl leading-tight tracking-tighter">A focus device made for the outdoors</p>
                </div>

                <div className="flex flex-col items-start justify-center z-10 text-white text-start px-4 text-base sm:text-xl leading-tight tracking-tighter">
                  Leaf 1 shines in sunlight - a display that stays <br />
                  crisp and clear, even under open sky.
                </div>
              </div>
            </section>


            {/* combined six and seven */}
            <section className='   h-screen flex flex-col md:flex-row  justify-between items-center bg-black'>

              {/* Sixth Section: Image with Features */}
              <section className="horizontal-section w-screen  h-screen flex-shrink-0 justify-between items-center bg-black">
                <div className="flex flex-col-reverse md:flex-col items-center justify-center ">
                  <div className=' p-4 md:p-0 md:w-[40%]'>

                    <Image
                      src="/darkmode.JPG"
                      alt="Lume Paper Display"
                      width={500}
                      height={500}
                      className="  md:px-0 w-full  md:rounded-b-xl md:rounded-none rounded-xl  "
                    />
                  </div>

                  <div className=' px-4 md:px-0 py-20 md:py-10 md:w-[40%] mt-[6%]'>
                    <div className=" w-full  flex flex-col sm:flex-row gap-[4%]  items-start justify-start ">
                      {section6Contents.map((item, index) => (
                        <div
                          key={index}
                          className="horizontal-section mt-10 md:mt-0 flex md:flex-col items-start md:justify-center gap-6  w-full sm:w-80"
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            className="h-8 w-8 sm:h-12 sm:w-12 "
                            width={80}
                            height={80}
                          />
                          <div className='space-y-2'>
                            <h2 className="text-white text-base sm:text-lg font-semibold leading-tight tracking-tighter">
                              {item.title}
                            </h2>
                            <p className="text-white text-sm sm:text-base  leading-tight tracking-tighter">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Seventh Section: Tablet Animation */}
              <section ref={pinRef} className="horizontal-section w-screen h-screen flex-shrink-0 flex items-center justify-center bg-black relative">
                <div
                  ref={text3Ref}
                  className="absolute w-full px-4 text-white opacity-90 whitespace-pre-wrap z-20 !text-xl sm:!text-4xl font-horizona leading-tight tracking-tighter"
                >
                  {splitText(
                    "Lights off, amber on - for an \n softer night time experience"
                  )}
                </div>

                <div
                  ref={imageRef}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    style={{
                      transformOrigin: "center center",
                    }}
                    src={`${isMobile ? '/tab_mobile.png' : '/new.png'}`}
                    alt="Lume Paper Display"
                    width={800}
                    height={800}
                    className="object-cover rounded-2xl w-full"
                  />
                </div>

                <div
                  ref={rightContentRef}
                  className="absolute top-[35%] md:top-80 px-6 text-white opacity-90 right-4 sm:right-8 transform -translate-y-1/2 flex flex-col  gap-4 max-w-lg sm:max-w-2xl"
                >
                  <h1 className="text-3xl sm:text-5xl text-center md:text-start whitespace-nowrap font-horizona leading-tight tracking-tighter">
                    Blue Light Blocked
                  </h1>
                  <p className="text-base text-center md:text-start sm:text-lg leading-tight tracking-tighter">
                    Devices that emit blue light, affects our visionary senses <br />
                    even during the night, Leaf 1 doesn't
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center mt-10 sm:mt-20">
                    {RightSectionContents.map((item, index) => (
                      <div
                        key={index}
                        className="horizontal-section flex flex-row md:flex-col items-start md:justify-center gap-4 w-full sm:w-80 px-4 mt-4"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          className="h-10 w-10 sm:h-12 sm:w-12"
                          width={80}
                          height={80}
                        />
                        <div>
                          <h2 className="text-white text-sm sm:text-base font-bold opacity-70">
                            {item.title}
                          </h2>
                          <p className="text-white text-xs sm:text-sm font-medium opacity-70">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </section>

          </div>
        </div>
      </section>

      <section ref={newSectionRef} className="bg-[#18190F]">
        {/* Delve into Leaf 1 */}
        <div className=" relative bg-[#18190F] flex flex-col sm:flex-row justify-between px-6  sm:px-40 items-center pt-20 sm:pt-50 pb-5 w-full">
          <div className="flex flex-col space-y-6 sm:space-y-15 font-horizona leading-tight tracking-tighter w-full sm:w-[40%]">
            <h1 className="text-white text-4xl sm:text-6xl">Delve into <br /> Leaf 1</h1>
            <p className="text-white text-base sm:text-lg font-regular leading-tight tracking-tighter">
              Explore every aspect of Leaf 1 and discover <br /> your thoughts!
            </p>
          </div>

          <div className="w-full sm:w-[60%] mt-6 sm:mt-0">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-4">
              {NewSectionContent.map((item, index) => (
                <div
                  key={index}
                  className="new-section-item flex flex-col items-center cursor-pointer group w-full"
                >
                  <div className="bg-[#303027] p-2 rounded-t-xl w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={250}
                      height={250}
                      className="new-section-image h-auto rounded group-hover:scale-105 w-full"
                    />
                  </div>
                  <h3 className="bg-[#45453d] p-4 font-medium rounded-b-xl w-full text-white text-center transition-colors duration-300 text-xs sm:text-sm">
                    {item.title} →
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        {/* <div className=' relative md:hidden bg-[#18190F] text-center pt-10'>
          <h1
            className=" md:hidden text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-horizona leading-tight tracking-tighter text-white"
          >
            What People are saying
          </h1>
        </div> */}
        <section
          ref={testimonialContainerRef}
          className="relative flex h-auto sm:h-screen w-full flex-col justify-center bg-[#18190F] px-4 sm:px-20 py-10 sm:py-0 sm:overflow-hidden"
        >
          <div className="flex w-full flex-col sm:flex-row items-center sm:items-start justify-between mb-8 sm:mb-12">
            <h1
              ref={people1Ref}
              className="hidden sm:block text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-horizona leading-tight tracking-tighter text-white"
            >
              What People
            </h1>
            <h1
              ref={people2Ref}
              className="hidden sm:block mt-6 sm:mt-10 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-horizona leading-tight tracking-tighter text-white"
            >
              are saying
            </h1>
            <h1
              className="sm:hidden text-4xl font-horizona leading-tight tracking-tighter text-white text-center"
            >
              What People are saying
            </h1>
          </div>

          <div
            ref={testimonialRef}
            className="w-full max-w-lg sm:max-w-3xl mx-auto space-y-8 sm:space-y-10 sm:absolute sm:left-1/2 sm:top-20 sm:-translate-x-1/2"
          >
            {TestimonialContents.map((item, index) => (
              <div
                key={index}
                className="flex px-4 sm:px-6 justify-center sm:justify-start sm:odd:justify-end"
              >
                <div
                  className="testimonial-card flex h-auto sm:h-[300px] w-full max-w-[500px] sm:max-w-[600px] flex-col justify-between rounded-md bg-[#515438] p-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-amber-400 p-2 object-cover"
                    />
                    <div>
                      <h3 className="text-base sm:text-lg leading-tight tracking-tighter text-white">{item.name}</h3>
                      <p className="text-white opacity-80 text-sm sm:text-base leading-tight tracking-tighter">{item.role}</p>
                    </div>
                  </div>
                  <div className="text-base sm:text-lg text-left sm:even:text-right mt-4">
                    <p className="mb-2 text-white font-horizona leading-tight tracking-tighter text-lg sm:text-xl">{item.testi}</p>
                    <p className="mb-4 text-white font-horizona leading-tight tracking-tighter text-lg sm:text-xl">{item.cmt}</p>
                    <span className="text-white underline text-xs sm:text-base leading-tight tracking-tighter">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Know About Us */}
        {/* <div className="flex flex-col gap-8 sm:gap-10 text-center justify-center text-white mt-10 leading-tight">
          <h1 className="opacity-40 text-sm sm:text-base">know more about us:</h1>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
            {KnowImages.map((image, index) => (
              <Image
                key={index}
                src={image.image}
                alt={image.image || `Knowledge Image ${index + 1}`}
                width={150}
                height={160}
                className="knowledge-image w-32 sm:w-48"
              />
            ))}
          </div>
        </div> */}

        {/* About Us */}
        <section className="bg-[#18190F] relative h-auto w-full gap-10 sm:gap-20 flex flex-col sm:flex-row justify-between mx-auto items-start pt-10 sm:pt-30">
          <div className=' max-w-4xl flex flex-col  md:flex-row justify-between mx-auto gap-20'>

            <Image
              src="/sun.avif"
              alt="sun"
              width={1000}
              height={800}
              className="sun-image w-full md:w-1/2 object-cover p-4"
            />
            <div className="flex flex-col space-y-6 px-4 sm:px-0">
              <h1 className="text-4xl sm:text-6xl text-white font-horizona leading-tight tracking-tighter">About Us</h1>
              <p className="text-white opacity-60 font-horizona leading-tight tracking-tighter text-base sm:text-lg">
                We have been students most of our lives surrounded by notebooks,
                books, paper bundles and know the problem first hand.
              </p>
              <p className="text-white opacity-60 font-horizona leading-tight tracking-tighter text-base sm:text-lg">
                Notebooks with traditional note taking processes are critical in a student's
                life but they are not at all optimized for the current day needs
                with the current day tech. We want to solve this problem, build a
                beautiful and innovative product, and cater to millions of
                students.
              </p>
              <p className="font-horizona leading-tight tracking-tighter text-base sm:text-lg italic text-white opacity-60">
                Arvind Mohan,
                <br /> Yaswanth Rayapati Founders
              </p>
            </div>
          </div>
        </section>

        {/* Glance */}
        <div className=" relative bg-[#18190F] flex flex-col gap-8 sm:gap-10 text-center items-center justify-center pt-20 sm:pt-40 pb-20 sm:pb-50">
          <div className="flex flex-row gap-2 items-center justify-center">
            <h1 className="bg-white rounded-md text-black font-medium px-2 text-sm sm:text-base">DC-1</h1>
            <h1 className="text-white text-lg sm:text-xl uppercase">At A GLANCE</h1>
          </div>

          <div className="flex flex-wrap w-full md:w-[75%] justify-center items-center  gap-10 sm:gap-9">
            {Glance.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 items-center justify-center">
                <img src={item.image} alt={item.title} className="w-8 sm:w-10 h-auto" />
                <h3 className="mt-2 text-center font-medium tracking-tighter max-w-[100px] md:max-w-md text-[#B7B7B4] text-sm sm:text-base">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HorizontalScrollAnimation;