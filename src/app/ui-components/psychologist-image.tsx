"use client";

interface PsychologistImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
}

const PsychologistImage = ({
  src,
  fallbackSrc,
  alt,
}: PsychologistImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        e.currentTarget.src = fallbackSrc;
      }}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
};

export { PsychologistImage };
