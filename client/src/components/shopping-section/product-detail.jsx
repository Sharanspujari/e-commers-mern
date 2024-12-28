import { StarIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
const ProductDetailDialog = ({ open, setOpen, productDetail }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white grid grid-cols-2 gap-8 sm:p-12 max-h-[500px] overflow-auto max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] ">
                <div className='relative overflow-hidden rounded-lg'>
                    <img src={productDetail?.image} alt={productDetail?.title} width={600} height={600} className='aspect-square object-cover w-full' />
                </div>
                <div >
                    <div>
                        <h1 className='text-2xl font-extrabold'>{productDetail?.title}</h1>
                        <p className='text-lg mb-5 mt-5 text-muted-foreground'>
                            {productDetail?.description}
                        </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={`text-3xl font-bold text-primary ${productDetail?.salePrice > 0 ? "line-through" : ""}`}>
                            ${productDetail?.price}
                        </p>
                        {
                            productDetail?.salePrice > 0 ? <p className='text-2xl font-bold text-gray-500'>${productDetail?.price}</p> : null
                        }
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='flex items-center gap-0.5'>
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                        </div>
                        <span className='text-gray-500'>{4.5}</span>
                    </div>
                    <div className='mt-5 mb-5'>
                        <Button className="w-full bg-black text-white hover:bg-gray-800"> Add to cart</Button>
                    </div>
                    <Separator className="bg-gray-200" />
                    <div className='max-h-[300px] overflow-auto mt-3'>
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>
                                            Sharan Pujari
                                        </h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-gray-500'>This is an awesome product</p>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>
                                            Sharan Pujari
                                        </h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-gray-500'>This is an awesome product</p>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>
                                            Sharan Pujari
                                        </h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-gray-500'>This is an awesome product</p>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>SM</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>
                                            Sharan Pujari
                                        </h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-gray-500'>This is an awesome product</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-6 gap-2'>
                            <Input placeholder="Write a review..." />
                            <Button className="bg-black text-white hover:bg-gray-500">Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailDialog