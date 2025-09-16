import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import image1 from "@/assets/banner1.jpg";
import image2 from "@/assets/banner2.jpg";
import image3 from "@/assets/banner3.jpg";
import Collections from "@/pages/Collections";


function Home() {
  const images = [image1, image2, image3];

  return (
    <div>
    <div className="flex flex-col min-h-screen mt-15 ">

      <main className="flex-grow flex flex-col items-center w-full">
        <div className="w-full max-w-4xl px-4 py-8">
          <Carousel className="w-full relative">
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <Card className="border-none w-full">
                    <CardContent className="p-0">
                      <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white absolute top-1/2 left-2 -translate-y-1/2 z-10" />
            <CarouselNext className="text-white absolute top-1/2 right-2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </main>

      
    </div>
    <div className="-mt-35"> 
 <Collections/>
    </div>
   
    </div>
  );
}

export default Home;
