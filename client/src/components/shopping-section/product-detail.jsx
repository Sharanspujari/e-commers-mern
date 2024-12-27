import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import { Separator } from '../ui/separator'
const ProductDetailDialog = ({ open, setOpen, productDetail }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className='relative overflow-hidden rounded-lg'>
                    <img src={productDetail?.image} alt={productDetail?.title} width={600} height={600} className='aspect-square object-cover w-full' />
                </div>
                <div >
                    <div>
                        <h1 className='text-3xl font-extrabold'>{productDetail?.title}</h1>
                        <p className='text-2xl mb-5 mt-5 text-muted-foreground'>
                            {productDetail?.description}
                        </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={`text-3xl font-bold text-primary ${productDetail?.salePrice > 0 ? "line-through" : ""}`}>
                            {productDetail?.price}
                        </p>
                        {
                            productDetail?.salePrice > 0 ? <p className='text-2xl font-bold text-gray-500'>{productDetail?.price}</p> : null
                        }
                    </div>
                    <div className='mt-5 mb-5'>
                        <Button className="w-full bg-black text-white hover:bg-gray-800"> Add to cart</Button>
                    </div>
                    <Separator className="bg-gray-200" />
                    <div className='max-h-[300px] overflow-auto'>
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailDialog