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
      <div className="relative">
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
          <div className="absolute bottom-0 right-0">
            <Image
              alt="Filigran"
              src="/images/izmir.svg" // Filigran görüntüsünün yolu
              width={width / 3} // Filigran boyutu ayarlayabilirsiniz
              height={height / 3}
              className="opacity-25" // İsteğe bağlı: filigranı daha az belirgin yapmak için opaklık ayarı
            />
          </div>
      </div>
    </div>
  );
};

export default ZoomImage;
