import { Card, CardContent } from "@/components/ui/card";
import { montserrat } from "@/fonts/fonts";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export interface Testimonials {
  name: string;
  description: string;
}

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
                  <CardContent className="flex aspect-square items-center justify-center p-6 flex-col bg-transparent">
                    <span className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md text-white font-extrabold`}>
                      &quot;{testimonial.description}&quot;
                    </span>
                    <span className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md text-white font-extrabold`}>
                      - {testimonial.name}
                    </span>
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
