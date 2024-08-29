import { Product } from "@/src/models/product";
import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

export default function CardProduct({ product }: { product: Product }) {
  const [emblaRef] = useEmblaCarousel({ loop: false });

  return (
    <div className="rounded-lg w-[300px] max-xl:w-[250px] max-lg:w-[205px] max-md:w-[185px] max-sm:w-[160px] bg-white shadow-md pb-[10px] hover:brightness-90 duration-200 cursor-pointer">
      <div className="relative w-full  overflow-hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {product.images.length > 0 ? (
              product.images.map((image, index) => (
                <div
                  key={index}
                  className="embla__slide flex justify-center rounded-t-lg"
                >
                  <Image
                    src={image}
                    alt={`Imagem do produto ${product.title}`}
                    width={300}
                    height={200}
                    className="object-cover aspect-[8/10]"
                  />
                </div>
              ))
            ) : (
              <div className="embla__slide flex justify-center items-center rounded-t-lg">
                <p>Sem imagens disponíveis</p>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 bg-gray-400 rounded-full"
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
      <h5 className="font-bold text-lg mt-2 px-[10px] text-primary text-center truncate  max-lg:text[14px]">
        {product.title}
      </h5>
      <p className="text-gray-700 px-[10px] text-center">
        R${product.price.toFixed(2)}
      </p>
    </div>
  );
}
