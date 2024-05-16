import Image from "next/image";
import React, { useState } from "react";

const ZoomImage = ({ src, alt, className, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative overflow-hidden shadow-lg stroke-transparent">
      <Image
        alt={alt}
        className={`w-full h-full ${className}`}
        src={src}
        width={width}
        height={height}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.5s ease-in-out",
        }}
      />
    </div>
  );
};

export default ZoomImage;
