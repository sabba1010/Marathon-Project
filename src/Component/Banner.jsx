import React, { useState } from 'react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80',
    title: 'Run for a Cause',
    description: 'Join the city marathon and support local charities.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    title: 'Challenge Your Limits',
    description: 'Push your endurance and reach new heights in the upcoming marathon.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    title: 'Celebrate Health & Fitness',
    description: 'Be part of an inspiring community promoting healthy living.',
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // Next slide
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  // Previous slide
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`duration-700 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
        >
          {index === current && (
            <>
              <img src={slide.image} alt={slide.title} className="w-full h-64 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                <h2 className="text-2xl font-bold">{slide.title}</h2>
                <p className="mt-1">{slide.description}</p>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        aria-label="Next Slide"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Banner;
