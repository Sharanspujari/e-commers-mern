
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AdminProductTail = ({product,setOpenAddProductModal,setCurrentEditId,currentEditId,setFormData}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
     <div>
        <div className='relative'>
          <img
          src={product?.image}
          alt={product?.title}
          className='w-full h-[300px] object-cover rounded-t-lg'
           />
        </div>
        <CardContent>
            <h2 className='text-xl mt-3 font-bold mb-2'>{product?.title}</h2>
            <div className='flex justify-between items-center mb-2'>
                <span className={`${product?.salePrice > 0 ? 'line-through' : ""} text-lg font-semibold text-primary`}>${product?.price}</span>
                {
                    product?.salePrice > 0 ? (<span className='text-lg font-bold'>${product?.salePrice}</span>
                    ):null
                }
            </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Button onClick={()=>{setCurrentEditId(product?._id);setOpenAddProductModal(true);setFormData(product)}}  className="bg-black text-white rounded-md hover:bg-slate-700">Edit</Button>
            <Button className="bg-black text-white rounded-md hover:bg-slate-700">Delete</Button>
        </CardFooter>
     </div>
    </Card>
    
  )
}

export default AdminProductTail