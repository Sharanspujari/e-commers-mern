// import React from 'react'
import { HousePlug, Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/config"

const MenuItems = ()=>{
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {
        shoppingViewHeaderMenuItems.map((menuItem)=><Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
      }
    </nav>
  )
}

const headerRightContent = ()=>{
  return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
<Button>

</Button>
  </div>
}

const ShoppingHeader = () => {
  const {isAuthenticated}  = useSelector((state)=>state.auth)
  
  return (
<header className="sticky top-0 z-40 w-full border-b bg-background">
<div className="flex h-16 items-center justify-between px-4 md:px-6">
<Link to={"/shop/home"} className="flex items-center gap-2">
<HousePlug />
<span className="font-bold">E-commerce</span>
</Link>
{/*for Mobile device */}
<Sheet>
  <SheetTrigger asChild>
  <Button variant="outline" size="icon" className="lg:hidden">
  <Menu className="h-6 w-6"/>
  <span className="sr-only">Toggle header menu</span>
  </Button>
  </SheetTrigger>
  <SheetContent className="bg-white">
    <MenuItems/>
  </SheetContent>
</Sheet>
   {/* for large device */}
   <div className="hidden lg:block">
   <MenuItems/>
   </div>
   {
    isAuthenticated ? <div></div> : null
   }
  </div>
  </header>
  )
}

export default ShoppingHeader