"use client";

import { useEffect, useRef } from "react";

// Real-time amplitude visualization of the live microphone stream while
// recording. Purely visual — no transcription happens here or anywhere
// until after the recording stops.
export function Waveform({ stream }: { stream: MediaStream }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioCtx();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let frameId: number;

    function draw() {
      frameId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      const { width, height } = canvas!;
      ctx!.clearRect(0, 0, width, height);

      const barCount = 32;
      const barWidth = width / barCount;
      for (let i = 0; i < barCount; i++) {
        const value = dataArray[Math.floor((i / barCount) * bufferLength)] ?? 0;
        const barHeight = Math.max(4, (value / 255) * height);
        ctx!.fillStyle = "#f58a0b";
        ctx!.fillRect(
          i * barWidth + barWidth * 0.2,
          (height - barHeight) / 2,
          barWidth * 0.6,
          barHeight,
        );
      }
    }

    draw();

    return () => {
      cancelAnimationFrame(frameId);
      source.disconnect();
      audioContext.close().catch(() => {});
    };
  }, [stream]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={64}
      role="img"
      aria-label="Live audio waveform"
      className="h-16 w-full max-w-xs"
    />
  );
}
