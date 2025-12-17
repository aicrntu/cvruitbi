"use client";

export default function EventCard({
  image,
  title,
  speaker,
  description,
  date,
  time,
  fullDate,
}: {
  image: string;
  title: string;
  speaker?: string;
  description?: string;
  date?: string;
  time?: string;
  fullDate: { day: number; monthYear: string };
}) {
  return (
    <div
      className="
      w-full 
      max-w-[175px] sm:max-w-[190px] md:max-w-[210px]
      rounded-md shadow sm:shadow-md border border-[#00000020]
      overflow-hidden bg-white
    "
    >
      {/* IMAGE SECTION */}
      <div className="relative w-full h-28 xs:h-32 sm:h-36 md:h-40">
        <img
          src={encodeURI(image)}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {speaker && (
          <div
            className="
              absolute bottom-1 right-1 
              bg-white/90 px-1 py-[2px] rounded 
              text-[7px] sm:text-[8px] font-semibold text-gray-800
            "
          >
            {speaker}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-1.5 h-[32px] sm:h-[36px] flex items-center">
        <h2 className="text-[10px] sm:text-xs font-bold text-gray-900 leading-tight line-clamp-2">
          {title}
        </h2>
      </div>

      {/* DATE */}
      <div className="flex">
        <div
          className="
            text-white rounded-[2px] bg-[#ececec80] 
            text-center font-bold 
            text-[9px] sm:text-[10px] 
            m-[3px]
          "
        >
          <p className="text-[#ee9e26] text-lg sm:text-xl p-[4px] sm:p-[5px]">
            {fullDate.day}
          </p>

          <div className="py-[3px] px-2 w-full bg-[#ee9e26]">
            <p className="text-[6px] sm:text-[7px] whitespace-nowrap">
              {fullDate.monthYear}
            </p>
          </div>
        </div>

        {/* RIGHT TITLE */}
        <div
          className="
            flex items-center 
            px-2 sm:px-3 py-[2px]
            text-[8px] sm:text-[9px] font-semibold 
            text-gray-700 leading-tight
          "
        >
          <p className="line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  );
}
