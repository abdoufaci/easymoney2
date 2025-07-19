"use client";

import { useState } from "react";
import WavesurferPlayer from "@wavesurfer/react";
import { cn } from "@/lib/utils";

export default function AudioPlayer({
  content,
  isMyMessage,
}: {
  content: string;
  isMyMessage: boolean;
}) {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState();
  const [currentTime, setCurrentTime] = useState("0:00");

  var formatTime = function (time: number) {
    return [
      Math.floor((time % 3600) / 60), // minutes
      ("00" + Math.floor(time % 60)).slice(-2), // seconds
    ].join(":");
  };

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    //@ts-ignore
    setDuration(formatTime(ws.getDuration()));
    setIsPlaying(false);
  };

  const onAudioProcess = () => {
    //@ts-ignore
    setCurrentTime(formatTime(wavesurfer?.getCurrentTime()));
  };

  const onPlayPause = () => {
    //@ts-ignore
    wavesurfer?.playPause();
  };

  return (
    <div className="flex gap-x-3 p-[6px] items-center">
      <button onClick={onPlayPause}>
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn(
              "w-8 h-8 p-[6px] rounded-full",
              isMyMessage ? "bg-white text-brand" : "bg-brand text-white"
            )}>
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn(
              "w-8 h-8 p-2  rounded-full",
              isMyMessage ? "bg-white text-brand" : "bg-brand text-white"
            )}>
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      <div className="flex flex-col gap-y-1 h-[40px]">
        <WavesurferPlayer
          backend="MediaElement"
          width={150}
          height={20}
          barHeight={2}
          barWidth={2.5}
          barRadius={4}
          barGap={2.5}
          waveColor="rgba(255, 255, 255, 1)"
          progressColor="rgba(255,255,255)"
          cursorColor="transparent"
          barAlign="bottom"
          url={content}
          onReady={onReady}
          onAudioprocess={onAudioProcess}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <div className="text-white font-normal tracking-tight text-xs">
          {currentTime} / {duration}
        </div>
      </div>
    </div>
  );
}
