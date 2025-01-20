// import React from 'react'
import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp"
import bannerTwo from "../../assets/banner-2.webp"
import bannerThree from "../../assets/banner-3.webp"
import { ChevronLeftIcon, ChevronRightIcon, ShirtIcon, CloudLightning, BabyIcon, WatchIcon, UmbrellaIcon, Shirt, Layers2, SwatchBook, EthernetPort, Dessert, Puzzle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllShoppingProducts } from "@/store/user/products-slice";
import ShoppingProductTile from "@/components/shopping-section/product-tail";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
]

const brandWithIcon =[
  {id:"nike",label:"Nike",icon:Shirt},
  {id:"adidas",label:"Adidas",icon:Layers2},
  {id:"puma",label:"Puma",icon:SwatchBook},
  {id:"levi",label:"Levi",icon:EthernetPort},
  {id:"zara",label:"Zara",icon:Dessert },
  {id:"h&m",label:"H&M",icon:Puzzle}

]
const ShoppingHome = () => {
  const slides = [bannerTwo, bannerOne, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0)
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state?.shoppingProducts)
  console.log('productList: ', productList);
  useEffect(() => {
    dispatch(fetchAllShoppingProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
  }, [dispatch])
  useEffect(() => {
    let timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          slides.map((slide, i) => <img src={slide} key={i} className={`${i === currentSlide ? "opacity-100" : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />)
        }
        <Button onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length)} variant="outline" size="icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 border-0 rounded-md">
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)} variant="outline" size="icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 border-0 ">
          <ChevronRightIcon className="w-4 h-4" />
        </Button>

      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {
            categoriesWithIcon?.map(categoryiItem => <Card key={categoryiItem?.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <categoryiItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{categoryiItem?.label}</span>
              </CardContent>
            </Card>)
          }
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {
            brandWithIcon?.map(brandItem => <Card key={brandItem?.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{brandItem?.label}</span>
              </CardContent>
            </Card>)
          }
        </div>
      </section>
      <section>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {
            productList && productList.length > 0 ?
            productList?.map((productItem,i)=>(
              <ShoppingProductTile key={i} product={productItem}/>
            ))
            :null
           }
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShoppingHome