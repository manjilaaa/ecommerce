import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Collections from "@/pages/Collections";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


import banner1 from "@/assets/banner1.avif";
import banner2 from "@/assets/banner2.avif";
import banner3 from "@/assets/banner3.avif";

const Homepage = () => {
  const banners = [banner1, banner2, banner3];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
    
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <Carousel className="w-full h-screen">
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-screen w-full">
                    <img
                      src={banner}
                      alt={`Banner ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                   
                    <div className="absolute inset-0 bg-black/40"></div>

                   
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                      <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Welcome to ShopSphere
                      </h1>
                      <p className="text-xl md:text-2xl mb-8">
                        Your futuristic shopping experience starts here
                      </p>

                      <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-lg shadow-xl transform -rotate-3 mb-8">
                        <h2 className="text-3xl font-bold mb-2">BIG SALE</h2>
                        <p className="text-4xl font-extrabold mb-2">75% OFF</p>
                   
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

          
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2">
              <ChevronLeft size={32} />
            </CarouselPrevious>
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2">
              <ChevronRight size={32} />
            </CarouselNext>
          </Carousel>
        </section>

        <Collections />
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
