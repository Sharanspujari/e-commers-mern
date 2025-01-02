import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'

const CartWrapper = () => {
    return (
       <SheetContent className="sm:max-w-md bg-white">
        <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {/* Cart Items List Wrapper */}
        <div className='mt-8 space-y-4'>

        </div>
      
        {/*   Total  Cart Amount detail */}
        <div className='mt-8 space-y-4'>
             <div className='flex justify-between'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>$1000</span>
             </div>
        </div>
        <Button className="w-full bg-black text-white mt-6">Checkout</Button>
       </SheetContent>
    )
}

export default CartWrapper