import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export interface Testimonials {
  image: string;
}
const base = "https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/";

function CarouselTestimonials({ testimonials }: { testimonials: Testimonials[] }) {
  return (
    <>
      <Carousel className="overflow-hidden" plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}>
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-transparent shadow-none border-none">
                  <CardContent className="flex items-center justify-center p-6 bg-transparent">
                    <div className="relative w-[300px] h-[450px]">
                      <Image
                        src={`${base}/${testimonial.image}`}
                        alt="testimonial"
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                  </CardContent>

                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

    </>
  );
}

export default CarouselTestimonials;
