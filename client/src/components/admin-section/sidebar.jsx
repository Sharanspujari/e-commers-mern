// import React from 'react'
import { LayoutDashboard ,ShoppingBasket,BadgeCheck} from "lucide-react"
import { ChartNoAxesCombined } from "lucide-react"
import { Fragment } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const adminSidebarMenuItems = [
  {
      id:"dashboard",
      label:"dashboard",
      path:"/admin/dashboard",
      icon: <LayoutDashboard />
  },
  {
      id:"products",
      label:"products",
      path:"/admin/products",
      icon:<ShoppingBasket />
  }, {
      id:"orders",
      label:"orders",
      path:"/admin/orders",
      icon:<BadgeCheck />

  }

]

function SideBarMenuItems({setOpen}){
  const currentPath= useLocation();
  const navigate = useNavigate();
    return <nav className="mt-8 flex flex-col gap-2">
        {
 adminSidebarMenuItems.map((menuItem)=> <div className={`${currentPath.pathname===menuItem.path && "text-black font-bold"} flex text-gray-600 hover:text-gray-900 hover:bg-gray-200  items-center gap-2 px-3 py-3 rounded-md cursor-pointer`} 
 onClick={()=>{navigate(menuItem.path),setOpen(false)}} key={menuItem.id}>
  {menuItem.icon}
  <span>{menuItem.label}</span>
 </div>
           
 )    
        } 
    </nav>
    
}
const AdminSidebar = ({open,setOpen}) => {

  const navigate = useNavigate();
  return (
    <Fragment>
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="left" className="w-64 bg-white">
    <div className="flex flex-col h-full">
    <SheetHeader className="border-b">
   <SheetTitle className="flex gap-2 mt-6">
   <ChartNoAxesCombined size={30}/>
   <h1 className=" text-2xl font-extrabold">Admin Panel</h1>
   </SheetTitle>
</SheetHeader>
<SideBarMenuItems setOpen={setOpen}/>
    </div>

  </SheetContent>
  
</Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div onClick={()=>navigate("/admin/dashboard")} className="flex items-center gap-2 cursor-pointer">
        <ChartNoAxesCombined />
 <h1 className=" text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <SideBarMenuItems/>
      </aside>
    </Fragment>
  )
}

export default AdminSidebar