/**
 * Fourier brand logo component.
 * Renders dynamic SVG representing network telemetry security shields.
 */
import React from "react";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 32, className, style, ...props }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Fourier Logo"
      className={className}
      style={{ 
        height: size, 
        width: "auto", 
        objectFit: "contain",
        display: "inline-block",
        ...style
      }}
      {...props}
    />
  );
};

export default Logo;
