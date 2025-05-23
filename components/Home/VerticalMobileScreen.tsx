'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { contents, Glance, images, NewSectionContent, RightSectionContents, section6Contents, TestimonialContents } from "./contents";
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const VerticalScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLDivElement | null>(null);
  const text2Ref = useRef<HTMLDivElement | null>(null);
  const text3Ref = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const newSectionRef = useRef<HTMLDivElement | null>(null);
  const rightContentRef = useRef<HTMLDivElement | null>(null);
  const testimonialContainerRef = useRef<HTMLDivElement | null>(null);
  const people1Ref = useRef<HTMLDivElement | null>(null);
  const people2Ref = useRef<HTMLDivElement | null>(null);
  const testimonialRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggers = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    // Clear any existing ScrollTriggers on mount
    scrollTriggers.current.forEach(trigger => trigger.kill());
    scrollTriggers.current = [];

    // Validate refs
    if (
      !containerRef.current ||
      !text1Ref.current ||
      !text2Ref.current ||
      !text3Ref.current ||
      !imageRef.current ||
      !newSectionRef.current ||
      !rightContentRef.current ||
      !testimonialContainerRef.current ||
      !people1Ref.current ||
      !people2Ref.current ||
      !testimonialRef.current
    ) {
      console.warn('One or more refs are missing');
      return;
    }

    const text1Spans = text1Ref.current.querySelectorAll('span');
    const text2Spans = text2Ref.current.querySelectorAll('span');
    const text3Spans = text3Ref.current.querySelectorAll('span');

    // Set initial styles
    gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
      opacity: 0,
      y: 50,
    });

    gsap.set(text1Spans, { opacity: 0, y: 20 });
    gsap.set(text2Spans, { opacity: 0, y: 20 });
    gsap.set(text3Spans, { opacity: 0, y: 20 });

    gsap.set(imageRef.current, {
      opacity: 0,
      scale: 1.5,
    });

    gsap.set(rightContentRef.current, { opacity: 0, y: 50 });

    // Main timeline for vertical scrolling
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: self => {
          if (!containerRef.current) {
            self.kill();
          }
        },
      },
    });

    scrollTriggers.current.push(mainTl.scrollTrigger!);

    // Text animations
    mainTl.to(text1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    })
      .to(text1Spans, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.out',
      })
      .to(text1Spans, {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.in',
      })
      .to(text2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      })
      .to(text2Spans, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.out',
      })
      .to(text2Spans, {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.in',
      })
      .to(text3Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      })
      .to(text3Spans, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.out',
      })
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.inOut',
      })
      .to(rightContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      });

    // Testimonial animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: testimonialContainerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: self => {
          if (!testimonialContainerRef.current) {
            self.kill();
          }
        },
      },
    });

    scrollTriggers.current.push(tl.scrollTrigger!);

    tl.from([people1Ref.current, people2Ref.current], {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    const cards = gsap.utils.toArray('.testimonial-card');
    const cardHeight = 250;
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

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
          fontSize: width < 480 ? '1rem' : '1.25rem',
        });
        ScrollTrigger.refresh(true);
      }, 200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up all ScrollTriggers and GSAP animations
      scrollTriggers.current.forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      gsap.killTweensOf([
        text1Ref.current,
        text2Ref.current,
        text3Ref.current,
        text1Spans,
        text2Spans,
        text3Spans,
        imageRef.current,
        rightContentRef.current,
        testimonialRef.current,
        people1Ref.current,
        people2Ref.current,
      ]);
    };
  }, []);

  const splitText = (text: string) =>
    text.split('').map((char, i) =>
      char === ' ' ? <span key={i}> </span> : <span key={i}>{char}</span>
    );

  return (
    <div className="bg-[#18190F]">
      <Image
        src="/Home/shadow.png"
        alt="banner"
        width={1000}
        height={1000}
        className="w-full h-full object-cover fixed top-0 left-0"
      />
      <section ref={containerRef} className="min-h-screen w-full relative">
        <div className="w-full h-screen flex items-center justify-center p-4">
          <div className="w-full mx-auto text-center">
            <div
              ref={text1Ref}
              className="font-horizona text-2xl leading-tight tracking-tighter"
            >
              {splitText("We choose calm over chaos, clarity over distraction")}
            </div>
            <div
              ref={text2Ref}
              className="font-horizona text-2xl leading-tight tracking-tighter mt-4"
            >
              {splitText("Introducing Leaf 1 - a gentler, more mindful focus device.")}
            </div>
            <div
              ref={text3Ref}
              className="font-horizona text-2xl leading-tight tracking-tighter mt-4"
            >
              {splitText("Lights off, amber on - for an \n softer night time experience")}
            </div>
            <div ref={imageRef} className="mt-8">
              <Image
                src="/tab_mobile.png"
                alt="Lume Paper Display"
                width={300}
                height={300}
                className="object-cover rounded-2xl w-full"
              />
            </div>
            <div ref={rightContentRef} className="mt-8 px-4 text-white text-center">
              <h1 className="text-3xl font-horizona leading-tight tracking-tighter">
                Blue Light Blocked
              </h1>
              <p className="text-base mt-2 leading-tight tracking-tighter">
                Devices that emit blue light, affects our visionary senses even during the night, Leaf 1 doesn't
              </p>
              <div className="flex flex-col gap-4 mt-6">
                {RightSectionContents.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                    <div>
                      <h2 className="text-base font-bold opacity-70">{item.title}</h2>
                      <p className="text-sm opacity-70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <section className="min-h-screen w-full p-4 bg-transparent">
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-[80vh] object-cover rounded-3xl"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source
              src="https://ik.imagekit.io/80lxmumju/hashmint/newvid.mp4?updatedAt=1747816545781"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="mt-4">
            <h1 className="text-2xl text-white font-horizona leading-tight tracking-tighter">
              Experience the first paper-like display with real-time speed.
            </h1>
            <div className="flex flex-col gap-4 mt-4">
              {contents.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Image src={item.image} alt={item.title} width={30} height={30} />
                  <div>
                    <h2 className="text-base text-white font-bold">{item.title}</h2>
                    <p className="text-sm text-white">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Images Section */}
        <section className="min-h-screen w-full p-4 bg-transparent">
          <div className="flex flex-col gap-4">
            {images.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={500}
                  height={300}
                  className="object-cover rounded-2xl w-full"
                  quality={100}
                />
                <p className="text-base font-semibold text-[#17190f]">{feature.title}</p>
                <p className="text-sm text-[#17190f] opacity-70">{feature.description}</p>
              </div>
            ))}
          </div>
          <h1 className="text-3xl font-horizona text-[#17190f] mt-6 leading-tight tracking-tighter">
            A focused, serene space that fosters focus & productivity.
          </h1>
          <div className="mt-4">
            <h2 className="text-base font-semibold text-[#17190f] opacity-70">Lume Paper Display</h2>
            <p className="text-sm text-[#17190f] opacity-70">
              Introducing the Lume Paper Display - a new kind of screen that feels like paper but runs at 60fps.
            </p>
          </div>
        </section>

        {/* Single Image Section */}
        <section className="min-h-screen w-full p-4 bg-transparent">
          <Image
            src="https://ik.imagekit.io/80lxmumju/hashmint/DSC04657%20(2).jpg?updatedAt=1747817052725"
            alt="Lume Paper Display"
            width={500}
            height={500}
            className="w-full h-[60vh] object-cover rounded-2xl"
          />
        </section>

        {/* Rotating Image Section */}
        <section className="min-h-screen w-full p-4 bg-transparent flex flex-col items-center gap-6">
          <Image
            src="/image.png"
            alt="Lume Paper Display"
            width={300}
            height={300}
            className="object-cover animate-[spin_20s_linear_infinite] w-3/4"
          />
          <div className="text-center text-base font-horizona text-[#17190f] leading-tight tracking-tighter">
            The vision behind the Hashmint is to create a healthier, more human-centered digital environment.
          </div>
        </section>

        {/* Built for Open Skies */}
        <section className="min-h-screen w-full relative bg-transparent">
          <Image
            src="/pragya.jpg"
            alt="Lume Paper Display"
            fill
            className="object-cover"
          />
          <div className="absolute top-10 p-4 text-white">
            <h1 className="text-4xl font-horizona leading-tight tracking-tighter">
              Built for <span className="italic">open skies</span>
            </h1>
            <p className="text-base mt-2 leading-tight tracking-tighter">
              A focus device made for the outdoors. Leaf 1 shines in sunlight - a display that stays crisp and clear.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="min-h-screen w-full p-4 bg-black">
          <Image
            src="/darkmode.JPG"
            alt="Lume Paper Display"
            width={500}
            height={500}
            className="w-full rounded-lg"
          />
          <div className="flex flex-col gap-4 mt-4">
            {section6Contents.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image src={item.image} alt={item.title} width={40} height={40} className="h-10 w-10" />
                <div>
                  <h2 className="text-base text-white font-semibold">{item.title}</h2>
                  <p className="text-sm text-white">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delve into Leaf 1 */}
        <section ref={newSectionRef} className="min-h-screen w-full p-4 bg-[#18190F]">
          <h1 className="text-4xl text-white font-horizona leading-tight tracking-tighter">
            Delve into Leaf 1
          </h1>
          <p className="text-base text-white mt-2">
            Explore every aspect of Leaf 1 and discover your thoughts!
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {NewSectionContent.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-[#303027] p-2 rounded-t-xl w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={250}
                    height={250}
                    className="rounded w-full"
                  />
                </div>
                <h3 className="bg-[#45453d] p-2 rounded-b-xl w-full text-white text-center text-sm">
                  {item.title} →
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section ref={testimonialContainerRef} className="min-h-screen w-full p-4 bg-[#18190F]">
          <h1
            ref={people1Ref}
            className="text-4xl font-horizona text-white leading-tight tracking-tighter"
          >
            What People are saying
          </h1>
          <div ref={testimonialRef} className="mt-8 space-y-8">
            {TestimonialContents.map((item, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className="testimonial-card flex flex-col justify-between rounded-md bg-[#515438] p-6 w-full max-w-[500px]">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-full bg-amber-400 p-2 object-cover"
                    />
                    <div>
                      <h3 className="text-base text-white">{item.name}</h3>
                      <p className="text-sm text-white opacity-80">{item.role}</p>
                    </div>
                  </div>
                  <div className={`text-base ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    <p className="mb-4 text-white font-horizona text-lg">{item.testi}</p>
                    <span className="text-white underline text-sm">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section className="min-h-screen w-full p-4 bg-[#18190F]">
          <div className="flex flex-col gap-4">
            <Image
              src="/sun.avif"
              alt="sun"
              width={500}
              height={400}
              className="w-full object-cover rounded-lg"
            />
            <h1 className="text-4xl text-white font-horizona leading-tight tracking-tighter">About Us</h1>
            <p className="text-base text-white opacity-60">
              We have been students most of our lives surrounded by notebooks, books, paper bundles and know the problem first hand.
            </p>
            <p className="text-base text-white opacity-60">
              Notebooks with traditional note taking processes are critical in a student's life but they are not at all optimized for the current day needs with the current day tech.
            </p>
            <p className="text-base italic text-white opacity-60">
              Arvind Mohan, Yaswanth Rayapati Founders
            </p>
          </div>
        </section>

        {/* Glance */}
        <section className="min-h-screen w-full p-4 bg-[#18190F] flex flex-col items-center">
          <div className="flex flex-row gap-2 items-center">
            <h1 className="bg-white rounded-md text-black font-medium px-2 text-sm">DC-1</h1>
            <h1 className="text-lg text-white uppercase">At A GLANCE</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {Glance.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 items-center">
                <img src={item.image} alt={item.title} className="w-8 h-auto" />
                <h3 className="text-sm text-[#B7B7B4] font-medium">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default VerticalScrollAnimation;