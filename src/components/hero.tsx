'use client';
import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export default function Hero() {
  const nameImages = ["shoe_hero.png", "belt_hero.png", "wallet_hero.png"];
  const links = ["#sapatos", "#carteiras", "#cintos"];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <section className="px-[10%] max-lg:px-[6%] max-md:px-[2%] mt-[30px] max-md:mt-[20px]">
      <div className="relative w-full">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {nameImages.map((image, index) => (
              <Link
                href={links[index]}
                key={index}
                className="embla__slide flex justify-center"
              >
                <Image
                  src={`/images/${image}`}
                  alt={`Banner ${index + 1}`}
                  width={1000}
                  height={1000}
                  quality={100}
                  priority={true}
                  className="object-fill aspect-[12/5] max-md:aspect-[12/8] border-[2px]"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {nameImages.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 bg-gray-400 rounded-full"
              aria-label={`Slide ${index + 1}`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
