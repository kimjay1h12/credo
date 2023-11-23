// components/SlidingImageBackground.js
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const SlidingImageBackground = ({ images = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentPage + 1) % (images?.length || 1);
      handlePagination(newIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage, images]);

  const handleScroll = (e) => {
    const newIndex = Math.floor(e.target.scrollLeft / e.target.clientWidth);
    setCurrentPage(newIndex);
  };

  const handlePagination = (index) => {
    setCurrentPage(index);
    scrollRef.current.scrollLeft = index * scrollRef.current.clientWidth;
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          scrollSnapType: "x mandatory",
          overflowX: "scroll",
          width: "100%",
          height: "150px", // Adjust as needed
        }}
        onScroll={handleScroll}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.url}
              alt={`Slide ${index + 1}`}
              width={"100%"} // Adjust as needed
              height={"100%"} // Adjust as needed
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-18px",
        }}
      >
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              color: index === currentPage ? "#000" : "#888",
              margin: "3px",
              cursor: "pointer",
            }}
            onClick={() => handlePagination(index)}
          >
            ⬤
          </span>
        ))}
      </div>
    </div>
  );
};

export default SlidingImageBackground;
