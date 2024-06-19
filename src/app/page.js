"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HomePage = () => {
  const logoRef = useRef(null);
  const [showButton, setShowButton] = useState(false); // State variable to control button visibility

  useEffect(() => {
    const logoElement = logoRef.current;

    gsap.set(logoElement, { transformStyle: 'preserve-3d' });

    const flipHorizontally = () => {
      gsap.to(logoElement, { rotationY: 0, duration: 0 }); // Reset rotationY to 0
      gsap.to(logoElement, { rotationY: 360, duration: 1, ease: 'power2.inOut' });
    };

    const flipVertically = () => {
      gsap.to(logoElement, { rotationX: 0, duration: 0 }); // Reset rotationX to 0
      gsap.to(logoElement, { rotationX: 360, duration: 1, ease: 'power2.inOut' });
    };

    // Periodically flip the logo every 6 seconds
    const flipInterval = setInterval(() => {
      const isHorizontal = Math.random() > 0.5;
      if (isHorizontal) {
        flipHorizontally();
      } else {
        flipVertically();
      }
    }, 6000);

    // Check screen size and update state variable
    const handleResize = () => {
      setShowButton(window.innerWidth > 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call once on initial render
    window.addEventListener('resize', handleResize);

    // Set the initial state for showButton after determining screen size
    setShowButton(window.innerWidth > 768);

    return () => {
      clearInterval(flipInterval); // Clear the interval when component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative px-[5%] lg:px-[15%] w-full h-screen overflow-hidden">
      <Head>
        <title>Askalitc UI</title>
        <meta name="description" content="Landing page with background video" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex w-full justify-center lg:justify-between py-10 lg:py-20 relative z-10 items-center'>
        <div ref={logoRef}>
          <Image src="/logo.png" alt="Logo" width={76} height={76} />
        </div>
        {showButton && (
          <button className="text-white font-bold bg-[#71673E] h-12 px-4">USKORO DOSTUPNI !</button>
        )}
      </div>

      <div className='flex flex-col relative z-10 mt-[3%]'>

        <h1 className='text-[10vw] sm:text-[8rem] font-custom leading-none sm:leading-[8rem] font-bold drop-shadow-2xl filter-none text-center lg:text-left'>
          ASK<br />
          <span className='text-[#71673E] '>SALTIC</span><br />
          TUZLA
        </h1>


        <p className='text-[3vw] sm:text-[15px] font-extralight opacity-80 mt-8 w-full sm:w-[55%] text-center lg:text-left'>
          Dobrodošli na službeni website Airsoft Kluba Saltic Tuzla!<br /> Pridružite nam se u avanturama punim adrenalina, strategije i timskog duha.<br /><br /> Bilo da ste iskusni igrač ili početnik, kod nas ćete pronaći nezaboravna iskustva, prijateljstva i izazove koji će vas motivirati.
          <strong className='underline pl-2'>Uskoro sve informacije o članstvima, timu, susretima i više na ovom sajtu...</strong>
        </p>
      </div>

      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-60 shadow-inner"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomePage;
