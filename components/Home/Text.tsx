'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { contents, images, KnowImages, NewSectionContent, section6Contents, TestimonialContents } from "./contents";
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (
      !containerRef.current ||
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

    // Set initial state for the image - fullscreen size
    gsap.set(imageRef.current, {
      opacity: 0,
      scale: 3.5,  // Start with a large scale for fullscreen effect
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

    // Calculate the exact width of all sections combined
    const calculateContentWidth = () => {
      // Directly return the sum based on your actual sections:
      return (
        window.innerWidth + // First section (w-screen)
        window.innerWidth + // Second section (w-screen)
        1200 +             // Third section (w-[1200px])
        1000 +             // Fourth section (w-[1000px])
        window.innerWidth + // Fifth section (w-screen)
        1400 +           // Sixth section (w-[1000px])
        window.innerWidth  // Fifth section (w-screen)
      );
    };

    // Set initial width for horizontal content
    const totalWidth = calculateContentWidth();

    gsap.set(horizontalContentRef.current, {
      width: totalWidth,
      display: 'flex',
    });

    // Create a main timeline that manages the entire animation sequence
    // This timeline will be responsible for both the text animations and transitioning to horizontal scroll
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',  // Reduced from 300% to minimize excess vertical scrolling
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onLeave: () => {
          // When leaving the horizontal scroll section, make sure the next section is visible
          gsap.to(newSectionRef.current, {
            zIndex: 100,
            duration: 0
          });
        },

      },
    });

    // Text animations in the main timeline
    mainTl.to(text1Spans, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 2,
      ease: 'power2.out',
    });

    mainTl.to(
      text1Spans,
      {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 1.5,
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
      duration: 2,
      ease: 'power2.out',
    });

    mainTl.to(
      horizontalContainerRef.current,
      {
        x: '0vw',
        opacity: 1,
        duration: 5,
        ease: 'power2.inOut',
      },
      '-=1.5'
    );

    mainTl.to(
      [text1Ref.current, text2Ref.current],
      {
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
      },
      '-=2'
    );

    // Horizontal scrolling implemented directly within the main timeline
    // rather than as a separate ScrollTrigger
    mainTl.to(horizontalContentRef.current, {
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
      duration: 25, // Control the speed of horizontal scrolling
    });


    mainTl.to(
      imageRef.current,
      {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      },
      '-=3'
    );

    mainTl.to(rightContentRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    }, '-=3')



    // Then bring in the text on top of the fullscreen image
    mainTl.to(
      text3Ref.current,
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=2.5'
    );


    // Animate the text spans
    mainTl.to(text3Spans, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 2,
      ease: 'power2.out',
    });

    // Fade in the image AFTER text is done
    mainTl.to(imageRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    }, '-=1'); // Starts 1s before text ends, tweak as needed

    // Scale image to normal size (centered)
    mainTl.to(imageRef.current, {
      x: "-50%",
      y: "-50%",
      left: "50%",
      top: "50%",
      position: "absolute",
      scale: 1.2,
      duration: 2,
      ease: 'power2.inOut',
      transformOrigin: 'center center',
    }, '+=0.5');

    // After the image scales down, fade out the text
    mainTl.to(
      text3Spans,
      {
        opacity: 0,

        stagger: 0.05,
        duration: 1.5,
        ease: 'power2.in',
      },
      '-=0.5' // Start slightly before the image scaling finishes
    );


    mainTl.to(imageRef.current, {
      x: "-100%", // move fully to the left
      y: "-50%",
      scale: 1.2,
      duration: 2,
      ease: 'power2.inOut',
      transformOrigin: 'center center',
    }, '+=0.5');

    // put this before you start your timeline…
    gsap.set(rightContentRef.current, { opacity: 0, xPercent: 60 });
    mainTl.to(rightContentRef.current, {
      opacity: 1,
      xPercent: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=1');

    // This is the key part - we're adding a "lock" at the end of the animation
    // by essentially creating a dummy section that keeps the pin active
    mainTl.to({}, { duration: 0.5 });

    gsap.set(newSectionRef.current, {
      zIndex: -1, // Initially behind the horizontal section
    });

    ScrollTrigger.create({
      trigger: newSectionRef.current,
      start: 'bottom top', // Start when the top of the next section hits the bottom of the viewport
      onEnter: () => {
        // When entering the next section, bring it to the front
        gsap.to(newSectionRef.current, {
          zIndex: 100,
          duration: 0
        });
      }
    });






    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: testimonialContainerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Initial title animation
    tl.from([people1Ref.current, people2Ref.current], {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Card setup
    const cards = gsap.utils.toArray('.testimonial-card');
    const cardHeight = 300;
    const gap = 10;
    const visibleHeight = window.innerHeight * 0.6;
    const totalScrollDistance = (cardHeight + gap) * cards.length - visibleHeight;

    // Main scroll animation
    tl.to(testimonialRef.current, {
      y: -totalScrollDistance,
      duration: cards.length * 0.8,
      ease: 'none'
    });

    // Card entrances
    cards.forEach((card, i) => {
      tl.from(card, {
        opacity: 0,
        y: 80,
        duration: 0.6,
        ease: 'back.out(1)'
      }, i * 0.2);
    });

    // Curved exit animation for titles (last 20% of scroll)
    const exitPosition = cards.length * 0.8 * 0.8;

    // people1Ref curves inward from the left
    tl.to(people1Ref.current, {
      x: -300,       // Total horizontal movement
      y: -80,        // Single upward bend
      opacity: 0,
      duration: 1.8,
      ease: "power1.inOut",
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: -150, y: -20 },  // Bend starts here
          { x: -300, y: -80 }   // Curve peaks here
        ],
        curviness: 1.2
      }
    }, exitPosition);

    // Animate people2Ref (right side, bends inward to center)
    tl.to(people2Ref.current, {
      x: 300,            // move toward center
      y: -80,
      opacity: 0,
      duration: 1.8,
      ease: "power1.inOut",
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 150, y: -20 },  // Bend starts here
          { x: 300, y: -80 }   // Curve peaks here
        ],
        curviness: 1.2
      }
    }, exitPosition);




    const handleResize = () => {
      const width = window.innerWidth;
      gsap.set([text1Ref.current, text2Ref.current], {
        fontSize:
          width < 480 ? '1.25rem' : width < 640 ? '1.5rem' : width < 768 ? '1.75rem' : '2.25rem',
      });

      // Update content width on resize and recalculate scroll distance
      const contentWidth = calculateContentWidth();
      gsap.set(horizontalContentRef.current, { width: contentWidth });

      // Force ScrollTrigger to recalculate and refresh
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
      char === ' ' ? <span key={i}>&nbsp;</span> : <span key={i}>{char}</span>
    );

  return (
    <>
      <section
        ref={containerRef}
        className="h-screen w-full relative bg-white overflow-hidden"
      >
        {/* Text animation */}
        <div className="w-full h-full flex items-center justify-center p-4 relative">
          <div className="w-full max-w-4xl mx-auto text-center relative h-32 md:h-40">
            <div
              ref={text1Ref}
              className="absolute w-full font-semibold px-4 whitespace-pre-wrap"
            >
              {splitText("We choose calm over chaos, clarity over distraction")}
            </div>
            <div
              ref={text2Ref}
              className="absolute w-full font-semibold px-4 whitespace-nowrap"
            >
              {splitText(
                "Introducing Leaf 1 - a gentler, more mindful focus device."
              )}
            </div>
          </div>
        </div>

        {/* Horizontal scroll section */}
        <div
          ref={horizontalContainerRef}
          className="w-full h-full flex items-center overflow-hidden"
        >
          <div
            ref={horizontalContentRef}
            className="flex h-full items-center flex-nowrap"
          >
            {/* Horizontal sections */}
            <section className="horizontal-section w-screen flex-shrink-0 h-screen p-5  bg-transparent flex items-center justify-center text-xl font-bold">
              <section className="video-section sticky top-0 h-[95vh] w-full overflow-hidden">
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
                  <source src="/hashmintBanner.webm" type="video/webm" />
                  <source
                    src="/hashmintBanner_converted.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute bottom-8 right-3 z-10">
                  <div className="flex flex-row gap-3">
                    {contents.map((item, index) => (
                      <div
                        key={index}
                        className="horizontal-section flex flex-col items-start justify-center gap-4 w-80"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16"
                          width={100}
                          height={100}
                        />
                        <h2 className="text-white font-bold">{item.title}</h2>
                        <p className="text-white font-medium">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-15 left-12 z-10">
                  <h1 className="text-4xl font-bold text-start text-white leading-14">
                    Experience the first paper-like <br />
                    display with real-time speed.
                  </h1>
                </div>
              </section>
            </section>
            <section className="horizontal-section w-screen h-screen flex-shrink-0 p-5 bg-transparent flex flex-col justify-between text-xl font-bold pt-25  pb-15">
              <div className="grid grid-cols-3 gap-4 py-2 mt-4 w-full max-w-none">
                {images.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2"
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={750}
                      height={370}
                      className="object-contain w-full h-full rounded-2xl"
                      quality={100}
                    />

                    <div className="flex flex-row space-x-2 w-full  items-center justify-between text-center px-1">
                      <p className="text-sm text-gray-700">{feature.title}</p>
                      <p className="text-sm text-gray-700 w-80 text-start">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row justify-between  mt-10 w-full">
                <h1 className="text-5xl font-bold ">
                  A focused, serene space that fosters <br /> focus &
                  productivity.
                </h1>
                <div className="flex flex-col w-[700px]">
                  <h1 className="text-lg font-bold">Lume Paper Display</h1>
                  <p className="text-md font-medium">
                    Introducing the Lume Paper Display - a new kind of screen
                    that feels like paper but runs at 60fps. With Lume, enjoy
                    fluid work without distractions.
                  </p>
                </div>
              </div>
            </section>
            <section className="horizontal-section w-[1200px] bg-transparent  h-screen flex-shrink-0 p-5 flex items-center justify-center text-xl font-bold">
              <Image
                src="/DSC04014.png"
                alt="Lume Paper Display"
                width={1000}
                height={1000}
                className="h-screen w-[900px] object-cover"
              />
            </section>
            <section className="horizontal-section w-[1000px]  h-screen  flex-shrink-0 p-5 bg-transparent flex flex-col gap-40 items-center justify-center text-xl font-bold">
              <Image
                src="/image.png"
                alt="Lume Paper Display"
                width={500}
                height={500}
                className="object-contain w-[600px] animate-[spin_20s_linear_infinite]"
              />

              <div className="text-center ">
                The vision behind the Hashmint is to create a healthier, more
                <br />
                human-centered digital environment - designed to protect your
                <br />
                attention, health and autonomy
              </div>
            </section>
            <section className="horizontal-section w-screen h-screen flex-shrink-0  relative">
              {/* Background Image */}
              <Image
                src="/DSC04014.png"
                alt="Lume Paper Display"
                fill
                className="object-cover z-0"
              />

              {/* Overlay Text */}
              <div className="absolute top-40 left-45  flex flex-col items-start justify-center z-10 text-white text-center px-4">
                <h1 className="text-4xl font-bold mb-4">
                  Built for open skies
                </h1>
                <p className="text-3xl">A focus device made for the outdoors</p>
              </div>

              <div className="absolute top-45 right-95  flex flex-col items-start justify-center z-10 text-white text-start px-4">
                Leaf 1 shines in sunlight - a display that stays <br /> crisp
                and clear, even under open sky.
              </div>
            </section>
            <section className="horizontal-section w-[1400px] h-screen flex-shrink-0 justify-between items-center bg-transparent">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/DSC04014.png"
                  alt="Lume Paper Display"
                  width={1000}
                  height={1000}
                  className=" w-[900px] h-[700px] object-cover"
                />

                <div>
                  <div className="flex flex-row gap-5 items-center justify-center mt-20 ml-30">
                    {section6Contents.map((item, index) => (
                      <div
                        key={index}
                        className="horizontal-section flex flex-col items-start justify-center gap-4 w-80"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16"
                          width={100}
                          height={100}
                        />
                        <div>
                          <h2 className="text-black font-bold ">
                            {item.title}
                          </h2>
                          <p className="text-black font-medium">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="horizontal-section w-screen h-screen flex-shrink-0 flex items-center justify-center bg-transparent relative">
              <div
                ref={text3Ref}
                className="absolute w-full font-semibold px-4 whitespace-pre-wrap w-10 z-20 text-4xl"
              >
                {splitText(
                  "Lights off, amber on - for a softer night time experience. "
                )}
              </div>

              <div
                ref={imageRef}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <Image
                  style={{
                    transformOrigin: "center center",
                  }}
                  src="/new.png"
                  alt="Lume Paper Display"
                  width={1000}
                  height={1000}
                  className="object-cover rounded-2xl"
                />
              </div>

              <div
                ref={rightContentRef}
                className="absolute top-80  right-8 transform -translate-y-1/2 flex flex-col gap-4 max-w-2xl"
              >
                <h1 className="text-5xl whitespace-nowrap">
                  Blue Light Blocked
                </h1>
                <p className="text-xl">
                  Devices that emit blue light, affects our visionary senses
                  even during the night, Leaf 1 doesn't
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
      <section ref={newSectionRef} className=" bg-[#18190F]">
        <div className="flex flex-row justify-between md:px-40 items-center pt-50 mb-5">
          <div className="flex flex-col space-y-15">
            <h1 className="text-white text-6xl">Delve into Leaf 1</h1>
            <p className="text-white text-xl font-regular">
              Explore every aspect of Leaf 1 and discover <br /> your thoughts!
            </p>
          </div>

          <div className="">
            <div className="flex flex-row space-x-4">
              {NewSectionContent.map((item, index) => (
                <div
                  key={index}
                  className="new-section-item flex flex-col items-center"
                >
                  <div className="bg-[#303027] p-2 rounded-t-md">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={150}
                      height={150}
                      className="new-section-image max-w-full h-auto rounded"
                    />
                  </div>
                  <h3 className=" bg-[#45453d] px-3 py-2 font-medium rounded-b-md w-full text-white text-center">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section
          ref={testimonialContainerRef}
          className="relative flex h-screen w-full flex-col  justify-center overflow-hidden bg-[#18190F] px-4  md:px-20"
        >
          {/* Title section */}
          <div className="flex w-full flex-col items-start justify-between md:flex-row">
            <h1 ref={people1Ref} className="text-6xl font-bold text-white md:text-8xl lg:text-9xl">
              What People
            </h1>
            <h1 ref={people2Ref} className="mt-10 text-6xl font-bold text-white md:mt-30 md:text-8xl lg:text-9xl">
              are saying
            </h1>
          </div>

          {/* Testimonials container */}
          <div
            ref={testimonialRef}
            className="absolute left-1/2  top-150 w-full max-w-2xl -translate-x-1/2 space-y-8"

          >
            {TestimonialContents.map((item, index) => (
              <div
                key={index}
                className="testimonial-card flex h-[300px] w-[600px] flex-col justify-between rounded-md bg-[#515438] p-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="text-white opacity-80">{item.role}</p>
                  </div>
                </div>
                <div>
                  <p className="mb-4 text-lg text-white">{item.testi}</p>
                  <span className="text-white underline">{item.time}</span>
                </div>
              </div>
            ))}
          </div>


        </section>
        <div className='flex flex-col gap-10 text-center justify-center text-white text-lg mt-10'>
          Know more about us:
          <div className='flex flex-row gap-10 items-center justify-center'>

            {KnowImages.map((image, index) => (
              <Image
                key={index}
                src={image.image}
                alt={image.image || `Knowledge Image ${index + 1}`}
                width={190}  // Default width if not specified
                height={200} // Default height if not specified
                className="knowledge-image"
              />
            ))}
          </div>
        </div>
        <section className='bg-[#18190F] h-[80vh] max-w-4xl gap-10 flex flex-row justify-between mx-auto items-start mt-50'>
          <Image src='/sun.avif' alt='sun' width={1000} height={800} className='sun-image' />
          <div className='flex flex-col gap-10 text-3xl '>
            <h1 className='text-7xl text-white'>
            About Us
            </h1>
            <p className='text-[#4b4a4a] '>
            We have been students most of our lives surrounded by notebooks, books, paper bundles and know the problem first hand. Notebooks with traditional note taking processes are critical in a student's life but they are not at all optimized for the current day needs with the current day tech. We want to solve this problem, build a beautiful and innovative product, and cater to millions of students.
            </p>
            <p className='text-xl text-[#4b4a4a]'>
            Arvind Mohan,<br /> Yaswanth Rayapati Founders
            </p>
          </div>
            
        </section>




        
      </section>
    </>
  );
};

export default HorizontalScrollAnimation;