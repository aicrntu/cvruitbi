"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./SplitSlider.module.css";

type SplitSliderProps = {
  images: string[];
  cols?: number;
  fullScreen?: boolean;
  className?: string;
};

export default function SplitSlider({
  images,
  cols = 3,
  fullScreen = false,
  className = "",
}: SplitSliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<HTMLDivElement[]>([]);
  const currentRef = useRef(0);
  const playingRef = useRef(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current!;
    partsRef.current = [];
    wrapper.innerHTML = "";

    images.forEach((src) => new Image().src = src);

    // Create split parts
    for (let col = 0; col < cols; col++) {
      const part = document.createElement("div");
      part.className = styles.part;

      const sec = document.createElement("div");
      sec.className = styles.section;

      const img = document.createElement("img");
      img.src = images[0];

      part.style.setProperty("--x", `${(-100 / cols) * col}%`);

      sec.appendChild(img);
      part.appendChild(sec);
      wrapper.appendChild(part);

      partsRef.current.push(part);
    }

    setupCursor();
    setupEvents();

    return () => cleanupEvents();
  }, []);

  // ------------------ Cursor ------------------
  const setupCursor = () => {
    const cursor = cursorRef.current!;
    const cursorF = cursorFRef.current!;

    const svg =
      "data:image/svg+xml,%3Csvg width='47' height='47' viewBox='0 0 47 47' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M42.4 42.4C38.8 46 33.3 46 23.5 46C13.6 46 8.1 46 4.6 42.4C1 38.8 1 33.3 1 23.5C1 13.6 1 8.1 4.6 4.6C8.1 1 13.6 1 23.5 1C33.3 1 38.8 1 42.4 4.6C46 8.1 46 13.6 46 23.5C46 33.3 46 38.8 42.4 42.4Z' stroke='white'/%3E%3C/svg%3E";

    cursorF.style.backgroundImage = `url("${svg}")`;

    let size = 8;
    let sizeF = 36;
    let followSpeed = 0.16;

    cursor.style.setProperty("--size", `${size}px`);
    cursorF.style.setProperty("--size", `${sizeF}px`);

    let pageX = 0,
      pageY = 0,
      cursorX = 0,
      cursorY = 0;

    wrapperRef.current?.addEventListener("mousemove", (e) => {
      pageX = e.clientX - wrapperRef.current!.offsetLeft;
      pageY = e.clientY - wrapperRef.current!.offsetTop;
      cursor.style.left = `${pageX - size / 2}px`;
      cursor.style.top = `${pageY - size / 2}px`;
    });

    const loop = () => {
      cursorX += (pageX - cursorX) * followSpeed;
      cursorY += (pageY - cursorY) * followSpeed;
      cursorF.style.left = `${cursorX - sizeF / 2}px`;
      cursorF.style.top = `${cursorY - sizeF / 2}px`;
      requestAnimationFrame(loop);
    };

    loop();
  };

  // ------------------ Slide Logic ------------------
  const go = (dir: number) => {
    if (playingRef.current) return;

    playingRef.current = true;

    let next =
      currentRef.current + dir < 0
        ? images.length - 1
        : currentRef.current + dir >= images.length
        ? 0
        : currentRef.current + dir;

    currentRef.current = next;

    const anim = { duration: 2.3, ease: "power4.inOut" as any };

    partsRef.current.forEach((part, i) => {
      const sec = document.createElement("div");
      sec.className = styles.section;

      const img = document.createElement("img");
      img.src = images[next];
      sec.appendChild(img);

      const isDown = i % 2 !== 0;

      if (isDown) {
        part.prepend(sec);
        gsap.set(part, { y: "-100%" });
        gsap.to(part, { y: "0%", ...anim }).then(() => {
          part.children[1].remove();
          playingRef.current = false;
        });
      } else {
        part.append(sec);
        gsap.to(part, { y: "-100%", ...anim }).then(() => {
          part.children[0].remove();
          gsap.set(part, { y: "0%" });
          playingRef.current = false;
        });
      }
    });
  };

  // ------------------ Events ------------------
  const setupEvents = () => {
    wrapperRef.current?.addEventListener("wheel", (e) => {
      if (e.deltaY > 40) go(1);
      else if (e.deltaY < -40) go(-1);
    });

    wrapperRef.current?.addEventListener("keydown", (e: any) => {
      if (["ArrowDown", "ArrowRight"].includes(e.key)) go(1);
      if (["ArrowUp", "ArrowLeft"].includes(e.key)) go(-1);
    });
  };

  const cleanupEvents = () => {};

  // ------------------ Render ------------------
  return (
    <div
      className={`
        relative 
        overflow-hidden 
        ${fullScreen ? "w-screen h-screen" : "w-full h-[500px]"} 
        ${className}
      `}
    >
      {/* Main wrapper */}
      <div
        ref={wrapperRef}
        tabIndex={0}
        className={`${styles.wrapper} flex`}
      />

      {/* Next / Prev buttons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        <button onClick={() => go(1)}>
          <img
            src="/arrow-down.svg"
            className="w-4 h-4 rotate-180"
          />
        </button>
        <button onClick={() => go(-1)}>
          <img src="/arrow-down.svg" className="w-4 h-4" />
        </button>
      </div>

      {/* Cursor */}
      <div
        ref={cursorRef}
        className={`${styles.cursor}`}
        style={{
          width: "8px",
          height: "8px",
        }}
      />
      <div
        ref={cursorFRef}
        className={`${styles.cursorF}`}
        style={{
          width: "36px",
          height: "36px",
        }}
      />
    </div>
  );
}
