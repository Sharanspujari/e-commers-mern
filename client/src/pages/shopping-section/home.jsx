// import React from 'react'
import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp"
import bannerTwo from "../../assets/banner-2.webp"
import bannerThree from "../../assets/banner-3.webp"
const ShoppingHome = () => {
  const slides = [bannerTwo,bannerOne,bannerThree];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
         {
            slides.map((slide,i)=><img src={slide} key={i} className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"/>)
         }
         <Button>
          
         </Button>
      </div>
    </div>
  )
}

export default ShoppingHome