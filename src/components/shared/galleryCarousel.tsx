'use client';
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import clsx from "clsx";

interface GalleryCarouselProps {
  images: { src: string; alt: string }[];
  aspect?: string;
  className?: string;
  autoplayMs?: number;
}

export default function GalleryCarousel({
  images,
  aspect = "aspect-square",
  className = "",
  autoplayMs = 3000
}: GalleryCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: autoplayMs })]}
      className={clsx("w-full", className)}
    >
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={i} className="flex justify-center">
            <div className={clsx("relative w-full max-w-xs md:max-w-sm lg:max-w-md", aspect)}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain rounded-2xl"
                priority={i === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
