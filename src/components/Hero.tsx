import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  const nameImages = ["shoe_hero.png", "belt_hero.png", "portfolio_hero.png"];
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <section className="px-[10%] max-md:px-[2%] mt-[30px] max-md:mt-[20px]">
      <div className="relative w-full">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {nameImages.map((image, index) => (
              <div
                key={index}
                className="embla__slide flex justify-center"
              >
                <Image
                  src={`/images/${image}`}
                  alt={"Banner"}
                  layout="responsive"
                  width={1000}
                  height={1000}
                  quality={100}
                  priority={true}
                  className="aspect-[12/5] border-[2px]"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {nameImages.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 bg-gray-400 rounded-full"
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
