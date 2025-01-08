import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/user/cart-slice";
import { useToast } from "@/hooks/use-toast";
const CartItemContent = ({ cartItem }) => {

    const { user } = useSelector(state => state.auth)
    const { toast } = useToast();
    const dispatch = useDispatch();

    const handleCartItemDelete = (getCartItemId) => {
        dispatch(deleteCartItem({ userId: user?.id, productId: getCartItemId })).then(data => {
            if (data?.payload?.success) {
                toast({
                    title: "Cart item is deleted"
                })
            }
        })
    }

    const handleCartItemQuantity = (getCartItem, typeOfAction) => {
        dispatch(updateCartItem({
            userId: user?.id, productId: getCartItem?.productId, quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
        })).then(data => {
            if (data?.payload?.success) {
                toast({
                    title: "Cart is updated successfully"
                })
            }
        })
    }
    return (
        <div className="flex items-center space-x-4">
            <img src={cartItem?.image} alt={cartItem?.title} className="w-20 h-20 rounded object-cover" />
            <div className="flex-1">
                <h3 className="font-extrabold">
                    {cartItem?.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button disabled={cartItem?.quantity === 1} onClick={() => handleCartItemQuantity(cartItem, "minus")} className="h-8 w-8 rounded-full" size="icon" >
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button onClick={() => handleCartItemQuantity(cartItem, "plus")} className="h-8 w-8 rounded-full" size="icon" >
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <p className="font-semibold">
                    ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
                </p>
                <Trash onClick={() => handleCartItemDelete(cartItem?.productId)} className="cursor-pointer h-5" size={20} />
            </div>

        </div>
    )
}

export default CartItemContent