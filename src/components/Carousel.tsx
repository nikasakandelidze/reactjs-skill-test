import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";

interface CarouselProps {
  images: string[]; // Array of image URLs
  interval?: number; // Time in milliseconds between slides, default is 3000
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <Paper
      elevation={3}
      sx={{ position: "relative", width: 800, height: 500, overflow: "hidden" }}
    >
      {images.map((image, index) => (
        <Box
          key={image}
          component="img"
          src={image}
          alt={`Slide ${index}`}
          sx={{
            display: index === activeIndex ? "block" : "none",
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures the image covers the area without distortion
          }}
        />
      ))}
    </Paper>
  );
};

export default Carousel;
