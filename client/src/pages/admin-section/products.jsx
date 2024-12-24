// import React from 'react'

import { Button } from "@/components/ui/button"
import { Fragment, useEffect, useState } from "react"
import { addProductFormElements } from "@/config"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import CommonForm from "@/components/common/form"
import ProductImageUpload from "@/components/admin-section/imageUpload"
import { useDispatch, useSelector } from "react-redux"
import { addNewProduct, deleteProduct, editProduct, getAllProducts } from "@/store/admin/product-slice"
import { useToast } from "@/hooks/use-toast"
import AdminProductTail from "@/components/admin-section/product-tail"

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
  const [currentEditId,setCurrentEditId] =useState(null);
  const [imageLoading,setImageLoading] =useState(false);
  const dispatch = useDispatch();
  const {productList} =useSelector((state)=>state.adminProducts)
    const {toast} =useToast()

   
    const isBtnDisabled = ()=>{
      return Object.keys(formData).map((keys)=>formData[keys] !== '').every((item)=>item)
    }
    console.log('isBtnDisabled: ', isBtnDisabled());
  const onSubmit =(event)=>{
        event.preventDefault();
        currentEditId !== null ? dispatch(editProduct({
          id:currentEditId,formData:formData

        })).then((data)=>{
          if(data?.payload?.success){
            dispatch(getAllProducts());
            setFormData(initialFormData);
            setOpenAddProductModal(false)
            setCurrentEditId(null)
          }
        }):
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

  const handleDeleteProduct = (productId)=>{
   if(productId){
    dispatch(deleteProduct(productId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(getAllProducts())
      }
    })
   }
  
  }
  return (
    <Fragment>
   <div className="mb-5 w-full flex justify-end">
    <Button onClick ={()=>setOpenAddProductModal(true)} className="bg-black text-white hover:bg-black rounded-md">Add New Product</Button>
   </div>
   <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
    {
      productList && productList.length > 0 ? productList.map((productItem)=><AdminProductTail  key={productItem._id} handleDeleteProduct={handleDeleteProduct} setFormData={setFormData} setOpenAddProductModal={setOpenAddProductModal} setCurrentEditId={setCurrentEditId} currentEditId={currentEditId}  product={productItem}/>) : null
    }
    </div>
  <Sheet open={openAddProductModal} onOpenChange={()=>{setOpenAddProductModal(false);setCurrentEditId(null);setFormData(initialFormData)}}>
   <SheetContent side="right" className="overflow-auto bg-white">
<SheetHeader>
  <SheetTitle >
  {
    currentEditId !== null ? "Edit Product" : "Add Product"
  }
  </SheetTitle>
</SheetHeader>
<ProductImageUpload isEditMode={currentEditId !== null} imageFile={imageFile} setImageFile={setImageFile} setImageLoading={setImageLoading} imageLoading={imageLoading} uploadedImgUrl={uploadedImgUrl} setUploadedImgUrl={setUploadedImgUrl}/>
<div className="my-6">
<CommonForm formData={formData} setFormData={setFormData} isBtnDisabled={!isBtnDisabled()} formControls={addProductFormElements} onSubmit={onSubmit} buttonText={currentEditId !== null ? "Edit"  : "Add"}/>
</div>
   </SheetContent>
  </Sheet>
  
    </Fragment>
   
  )
}

export default AdminProducts