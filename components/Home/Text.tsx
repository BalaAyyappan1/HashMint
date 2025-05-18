'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import VideoHoverPlayer from '../VideoHoverPlayer';
import { contents, images, section6Contents } from "./contents";
import Image from 'next/image';
import AnimationSection from '../AnimationSection';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLDivElement | null>(null);
  const text2Ref = useRef<HTMLDivElement | null>(null);
  const horizontalContainerRef = useRef<HTMLDivElement | null>(null);
  const horizontalContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !text1Ref.current ||
      !text2Ref.current ||
      !horizontalContainerRef.current ||
      !horizontalContentRef.current
    ) {
      return;
    }

    const text1Spans = text1Ref.current.querySelectorAll('span');
    const text2Spans = text2Ref.current.querySelectorAll('span');

    // Set initial styles
    gsap.set([text1Ref.current, text2Ref.current], {
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

    // This is the key part - we're adding a "lock" at the end of the animation
    // by essentially creating a dummy section that keeps the pin active
    mainTl.to({}, { duration: 0.5 });

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
                <source src="/hashmintBanner_converted.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute bottom-8 right-8 z-10">
                <div className="flex flex-row gap-5">
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
                <h1 className="text-5xl font-bold text-start text-white leading-14">
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

                  <div className="flex flex-row space-x-2 w-full  items-center justify-between text-center px-6">
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
                  Introducing the Lume Paper Display - a new kind of screen that
                  feels like paper but runs at 60fps. With Lume, enjoy fluid
                  work without distractions.
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
              <h1 className="text-4xl font-bold mb-4">Built for open skies</h1>
              <p className="text-3xl">A focus device made for the outdoors</p>
            </div>

            <div className="absolute top-45 right-95  flex flex-col items-start justify-center z-10 text-white text-start px-4">
              Leaf 1 shines in sunlight - a display that stays <br /> crisp and
              clear, even under open sky.
            </div>
          </section>
          <section className="horizontal-section w-[1400px] h-screen flex-shrink-0 justify-between items-center bg-transparent">
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/DSC04014.png"
                alt="Lume Paper Display"
                width={1000}
                height={1000}
                className=" w-[900px] h-[800px] object-cover"
              />

              <div>
                <div className="flex flex-row gap-5 items-center justify-center mt-20 ml-20">
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
                        <h2 className="text-black font-bold ">{item.title}</h2>
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
      
</section>

        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollAnimation;