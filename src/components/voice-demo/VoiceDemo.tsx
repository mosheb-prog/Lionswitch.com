"use client";

import { useEffect, useRef, useState } from "react";
import { Waveform } from "./Waveform";
import { AskClaudeChat } from "./AskClaudeChat";
import { SAMPLE_CALL_LABEL, SAMPLE_CALL_TRANSCRIPT } from "./sample-call";

const MAX_RECORDING_SECONDS = 120;

type Phase =
  | "idle"
  | "permission-error"
  | "recording"
  | "transcribing"
  | "transcript-error"
  | "ready";

function MicIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19 11a7 7 0 0 1-14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VoiceDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isSample, setIsSample] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  async function startRecording() {
    setErrorMessage("");
    setIsSample(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (timerRef.current) clearInterval(timerRef.current);
        const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
        void submitRecording(blob);
      };

      recorder.start();
      setPhase("recording");
      setSeconds(0);
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_RECORDING_SECONDS) {
            stopRecording();
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setPhase("permission-error");
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
  }

  async function submitRecording(blob: Blob) {
    setPhase("transcribing");
    try {
      const formData = new FormData();
      formData.append("audio", blob, "demo-call.webm");
      const res = await fetch("/api/voice-demo/transcribe", {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? "Transcription failed.");
      setTranscript(body.transcript);
      setPhase("ready");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Transcription failed.");
      setPhase("transcript-error");
    }
  }

  function trySample() {
    setIsSample(true);
    setErrorMessage("");
    setTranscript(SAMPLE_CALL_TRANSCRIPT);
    setPhase("ready");
  }

  function reset() {
    setPhase("idle");
    setTranscript("");
    setIsSample(false);
    setErrorMessage("");
  }

  return (
    <div className="glass-card glow-orange mx-auto w-full max-w-2xl rounded-3xl p-6 text-on-dark sm:p-8">
      <p className="text-center text-sm font-semibold text-on-dark-2">
        Your calls, transcribed after you hang up. Ask Claude anything about
        them.
      </p>

      {phase === "idle" || phase === "permission-error" ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={startRecording}
            aria-label="Start talking to Lion Switch"
            className="mic-pulse grid h-24 w-24 place-items-center rounded-full bg-orange text-ink transition-transform hover:scale-105 focus-visible:scale-105"
          >
            <MicIcon className="h-10 w-10" />
          </button>
          <p className="text-sm text-on-dark-2">Tap the mic and talk</p>

          {phase === "permission-error" ? (
            <p role="alert" className="max-w-sm text-center text-sm text-orange-3">
              We couldn&apos;t access your microphone. You can still try the
              demo below.
            </p>
          ) : null}

          <button
            type="button"
            onClick={trySample}
            className="text-sm font-semibold text-orange-3 underline-offset-4 hover:underline"
          >
            Try a sample call instead
          </button>

          <p className="max-w-sm text-center text-xs text-on-dark-2/80">
            This recording is used only for this demo and is not stored.
            Nothing is transcribed while you&apos;re talking — only after you
            stop.
          </p>
        </div>
      ) : null}

      {phase === "recording" ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange/20 ring-4 ring-orange/40">
            <span className="h-4 w-4 animate-pulse rounded-full bg-orange" aria-hidden="true" />
          </div>
          {streamRef.current ? <Waveform stream={streamRef.current} /> : null}
          <p className="tabular-nums text-sm text-on-dark-2">
            {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")} / 2:00
          </p>
          <button
            type="button"
            onClick={stopRecording}
            className="rounded-full bg-on-dark px-6 py-2.5 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink hover:bg-on-dark-2"
          >
            Stop
          </button>
        </div>
      ) : null}

      {phase === "transcribing" ? (
        <div className="mt-6 flex flex-col items-center gap-3 py-6">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-on-dark-2 border-t-orange"
            aria-hidden="true"
          />
          <p className="text-sm text-on-dark-2">Transcribing your call…</p>
        </div>
      ) : null}

      {phase === "transcript-error" ? (
        <div className="mt-6 flex flex-col items-center gap-4 text-center">
          <p role="alert" className="text-sm text-orange-3">
            {errorMessage}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold font-[family-name:var(--font-heading)] text-ink hover:bg-orange-3"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={trySample}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-on-dark ring-1 ring-inset ring-white/25 hover:ring-orange"
            >
              Try the sample call
            </button>
          </div>
        </div>
      ) : null}

      {phase === "ready" ? (
        <div className="mt-6 space-y-5">
          {isSample ? (
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-orange-3">
              {SAMPLE_CALL_LABEL}
            </p>
          ) : null}
          <div className="rounded-2xl bg-ink/40 p-4 ring-1 ring-inset ring-white/10">
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-on-dark">
              Transcript
            </h4>
            <p className="mt-2 max-h-56 overflow-y-auto whitespace-pre-line text-sm leading-relaxed text-on-dark-2">
              {transcript}
            </p>
          </div>

          <AskClaudeChat transcript={transcript} />

          <div className="text-center">
            <button
              type="button"
              onClick={reset}
              className="text-sm font-semibold text-orange-3 underline-offset-4 hover:underline"
            >
              Start a new call
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
