"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  paused?: boolean;
};

export default function HeroVideo({ paused = false }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (paused) {
      video.pause();
      return;
    }

    const play = async () => {
      try {
        await video.play();
      } catch {
        /* autoplay may be blocked until user interaction */
      }
    };

    play();
  }, [paused]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-center"
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
