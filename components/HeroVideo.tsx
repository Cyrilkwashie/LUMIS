"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        await video.play();
      } catch {
        /* autoplay may be blocked until user interaction */
      }
    };

    play();
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
