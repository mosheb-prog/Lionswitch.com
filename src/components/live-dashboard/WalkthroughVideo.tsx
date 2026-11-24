"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// The 60-second Live Dashboard walkthrough. Shows a cover frame with a play
// button; the video file only loads when someone presses play.

export function WalkthroughVideo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-3xl bg-ink shadow-[0_30px_80px_-30px_rgba(19,24,32,0.7)] ring-1 ring-black/10">
      {playing ? (
        <video
          ref={videoRef}
          className="h-full w-full"
          src="/videos/live-dashboard-walkthrough.mp4"
          poster="/videos/live-dashboard-walkthrough-poster.jpg"
          controls
          autoPlay
          playsInline
          preload="auto"
        >
          Your browser can&apos;t play this video.
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play the 60-second Live Dashboard walkthrough video"
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src="/videos/live-dashboard-walkthrough-poster.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-ink/10 transition group-hover:bg-ink/0" />
          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-2 rounded-full bg-orange py-1 pl-1 pr-3 font-[family-name:var(--font-heading)] text-xs font-semibold sm:gap-3 sm:py-2 sm:pl-2 sm:pr-5 text-ink shadow-[0_0_0_6px_rgba(245,138,11,0.22),0_16px_40px_-10px_rgba(245,138,11,0.8)] transition group-hover:scale-105 sm:bottom-6 sm:left-6 sm:text-base">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-orange sm:h-10 sm:w-10">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
            <span className="sm:hidden">1:00</span>
            <span className="hidden sm:inline">Watch the 1-minute tour</span>
          </span>
        </button>
      )}
    </div>
  );
}
