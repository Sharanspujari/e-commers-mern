// import React from 'react'
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { logoutUser } from "@/store/auth-slice"
import { useState } from "react"
import CartWrapper from "./cart-wrapper"


const MenuItems = () => {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {
        shoppingViewHeaderMenuItems.map((menuItem) => <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
      }
    </nav>
  )
}

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth)
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
      <Button onClick={() => setOpenCartSheet(true)} varient="outline" size="icon">
        <ShoppingCart />
        <span className="sr-only">User cart</span>
      </Button>
      <CartWrapper />
    </Sheet>


    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-black cursor-pointer">
          <AvatarFallback className="bg-black text-white font-extrabold">
            {user.userName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger >
      <DropdownMenuContent side="right" className="w-56 bg-white">
        <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/shop/account')}>
          <UserCog className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  </div>
}

const ShoppingHeader = () => {
  // const {isAuthenticated,user}  = useSelector((state)=>state.auth)

  return (
    <header className="sticky bg-white top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to={"/shop/home"} className="flex items-center gap-2">
          <HousePlug />
          <span className="font-bold">E-commerce</span>
        </Link>
        {/*for Mobile device */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white">
            <MenuItems />
          </SheetContent>
        </Sheet>
        {/* for large device */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block"><HeaderRightContent /></div>

      </div>
    </header>
  )
}

export default ShoppingHeader