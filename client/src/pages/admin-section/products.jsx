// import React from 'react'

import { Button } from "@/components/ui/button"
import { Fragment, useEffect, useState } from "react"
import { addProductFormElements } from "@/config"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import CommonForm from "@/components/common/form"
import ProductImageUpload from "@/components/admin-section/imageUpload"
import { useDispatch, useSelector } from "react-redux"
import { addNewProduct, getAllProducts } from "@/store/product-slice"
import { useToast } from "@/hooks/use-toast"

const initialFormData ={
  image:null,
  title:"",
  description:"",
  category:"",
  brand:"",
  price:"",
  salePrice:"",
  totalStock:""
}
const AdminProducts = () => {
  const [openAddProductModal,setOpenAddProductModal] =useState(false);
  const [formData,setFormData] =useState(initialFormData);
  
    const [imageFile,setImageFile]=useState();
  const [uploadedImgUrl,setUploadedImgUrl]=useState(null);
  
  const [imageLoading,setImageLoading] =useState(false);
  const dispatch = useDispatch();
  const {productList} =useSelector((state)=>state.adminProducts)
  console.log('productList: ', productList);
  const {toast} =useToast()
  const onSubmit =(event)=>{
        event.preventDefault();
        dispatch(addNewProduct({
          ...formData,
          image:uploadedImgUrl
        })).then((data)=>{
           if(data?.payload?.success){
            dispatch(getAllProducts())
            setImageFile(null)
            setFormData(initialFormData)
            setOpenAddProductModal(false)
            toast({
              title:'Product added successfully'
            })
           }
        })
  }

  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch])
  return (
    <Fragment>
   <div className="mb-5 w-full flex justify-end">
    <Button onClick ={()=>setOpenAddProductModal(true)} className="bg-black text-white hover:bg-black rounded-md">Add New Product</Button>
   </div>
   <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
  <Sheet open={openAddProductModal} onOpenChange={()=>setOpenAddProductModal(false)}>
   <SheetContent side="right" className="overflow-auto bg-white">
<SheetHeader>
  <SheetTitle >
Add New Product
  </SheetTitle>
</SheetHeader>
<ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} setImageLoading={setImageLoading} imageLoading={imageLoading} uploadedImgUrl={uploadedImgUrl} setUploadedImgUrl={setUploadedImgUrl}/>
<div className="my-6">
<CommonForm formData={formData} setFormData={setFormData} formControls={addProductFormElements} onSubmit={onSubmit} buttonText="Add"/>
</div>
   </SheetContent>
  </Sheet>
   </div>
    </Fragment>
   
  )
}

export default AdminProducts