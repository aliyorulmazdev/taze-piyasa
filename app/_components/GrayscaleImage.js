import Image from "next/image";
import React, { useState } from "react";

const GrayscaleImage = ({ src, alt, className, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative overflow-hidden">
      <Image
        alt={alt}
        className={`w-full h-full ${className}`}
        src={src}
        width={width}
        height={height}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          filter: isHovered ? "none" : "grayscale(100%)",
          transition: "filter 0.5s ease-in-out",
        }}
      />
    </div>
  );
};

export default GrayscaleImage;
