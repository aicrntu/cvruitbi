"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";

export interface Member {
  name: string;
  subname: string;
  photo: string;
  color: string;
  role?: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface TeamCardsProps {
  members: Member[];
}

export default function TeamCards({ members }: TeamCardsProps) {
  return (
    <>
      {members.map((m, index) => (
        <HoverCard key={index} member={m} />
      ))}
    </>
  );
}

function HoverCard({ member }: { member: Member }) {
  const [hover, setHover] = useState(false);
  const isCEO = member.role === "ceo";

  const cardWidth = isCEO ? "w-[180px]" : "w-[150px]";
  const cardHeight = hover
    ? isCEO
      ? "h-[180px]"
      : "h-[160px]"
    : isCEO
    ? "h-[160px]"
    : "h-[140px]";

  const imgSize = isCEO ? "w-[75px] h-[75px]" : "w-[60px] h-[60px]";
  const hoverTop = isCEO ? "-top-8" : "-top-6";

  return (
    <div
      className={`relative flex justify-center items-start ${cardWidth}
        bg-white rounded-xl shadow-lg transition-all duration-500 ${cardHeight}`}
      style={{ ["--clr" as any]: member.color }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* ---------- IMAGE (Grow on hover) ---------- */}
      <div
        className={`absolute ${imgSize} transition-all duration-500
          ${hover ? `${hoverTop} scale-110` : "top-2 scale-100"}`}
      >
        <Image
          src={member.photo}
          alt={member.name}
          width={200}
          height={200}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>

      {/* ---------- CONTENT (with DELAY) ---------- */}
      <div
        className={`absolute w-full px-2 text-center transition-all duration-500
          ${hover ? "top-[60px] h-[110px]" : "top-[85px] h-[15px]"}`}
      >
        {/* Name (instant or slight delay) */}
        <h2
          className={`text-sm font-bold ${
            hover ? "opacity-100" : "opacity-100"
          }`}
          style={{ color: member.color }}
        >
          {member.name}
        </h2>

        {/* Subname (delayed fade-in + slide-up) */}
        <p
          className={`text-gray-700 mt-1 text-[10px] transition-all duration-300 delay-150
            ${hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          {member.subname}
        </p>

        {/* Social Icons (bigger delay + fade + slide) */}
        <div
          className={`flex justify-center gap-2 mt-2 transition-all duration-300 delay-300
            ${hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          {member.socials?.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              className="p-1.5 rounded-full text-white hover:scale-110 transition"
              style={{ background: member.color }}
            >
              <AiFillInstagram size={12} />
            </a>
          )}

          {member.socials?.twitter && (
            <a
              href={member.socials.twitter}
              target="_blank"
              className="p-1.5 rounded-full text-white hover:scale-110 transition"
              style={{ background: member.color }}
            >
              <AiOutlineTwitter size={12} />
            </a>
          )}

          {member.socials?.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              className="p-1.5 rounded-full text-white hover:scale-110 transition"
              style={{ background: member.color }}
            >
              <AiFillLinkedin size={12} />
            </a>
          )}

          {member.socials?.github && (
            <a
              href={member.socials.github}
              target="_blank"
              className="p-1.5 rounded-full text-white hover:scale-110 transition"
              style={{ background: member.color }}
            >
              <AiFillGithub size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

