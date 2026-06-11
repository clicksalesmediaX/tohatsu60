"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const noteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (noteTimer.current) clearTimeout(noteTimer.current);
    };
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video
      .play()
      .then(() => {
        setPlaying(true);
        video.setAttribute("controls", "");
      })
      .catch(() => {
        setShowNote(true);
        if (noteTimer.current) clearTimeout(noteTimer.current);
        noteTimer.current = setTimeout(() => setShowNote(false), 4200);
      });
  };

  return (
    <section className="video-sec" id="video">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">شاهده يعمل</span>
          <h2 data-words>صوت المحرك يقول الباقي</h2>
        </div>
        <div className={`video-frame${playing ? " playing" : ""}`}>
          <div className="slot">
            <Image
              src="/images/video-poster.webp"
              alt="قارب بمحرك توهاتسو 60 في عرض البحر"
              fill
              sizes="(max-width: 1280px) 92vw, 1240px"
            />
          </div>
          <video ref={videoRef} src="/assets/engine-video.mp4" preload="none" playsInline />
          <div className="video-cover" onClick={handlePlay}>
            <button className="play-btn" aria-label="تشغيل الفيديو">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <span className={`video-note${showNote ? " show" : ""}`}>
            أضف ملف الفيديو إلى المشروع باسم assets/engine-video.mp4
          </span>
        </div>
      </div>
    </section>
  );
}
