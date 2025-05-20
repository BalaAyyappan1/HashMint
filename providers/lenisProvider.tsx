// lenis-provider.tsx
"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { FC, useRef } from "react";

type LenisScrollProviderProps = {
  children: React.ReactNode;
};
const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef(null);
  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1, // applies to all scroll (wheel + touch)
        duration: 1.5, // fallback, mostly for scrollTo()
        smoothWheel: true, // for desktop mouse scroll
        syncTouch: true, // for mobile touch
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
    >
      {children as any} 
    </ReactLenis>
  );
};

export default LenisScrollProvider;