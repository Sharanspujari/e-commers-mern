import { Outlet } from "react-router-dom"
import AdminSidebar from "./sidebar"
import AdminHeader from "./header"
import { useState } from "react"


const AdminLayout = () => {
  const [open,setOpen] =useState(false);
  return (
    <div className="flex  min-h-screen">
        {/* Admin sidebar */}
         <AdminSidebar open={open} setOpen={setOpen}/>
        <div className="flex flex-1 flex-col">
           {/* admin header */}
              <AdminHeader setOpen={setOpen}/>
           <main className="flex-1 flex flex-col bg-muted/40 p-4 md:p-6">
            <Outlet/>
           </main>
        </div>
    </div>
  )
}

export default AdminLayout