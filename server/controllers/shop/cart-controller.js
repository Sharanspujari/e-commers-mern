const { title } = require("process");
const Cart =require("../../models/Cart")
const Product = require("../../models/Product")

// add product to cart
const addToCart = async(req,res)=>{
    try{
const {userId,productId,quantity} = req.body;
if(!userId || !productId || quantity<=0){
  return res.status(400).json({
        success:false,
        message:'Invalid data provided!'
    })
}
    const product = await Product.findById(productId)
    if(!product){
        return res.status(404).json({
            success:false,
            message:'Product not found'
        })
    }
    const cart = await Cart.findOne({userId});
    if(!cart){
        cart = new Cart({userId,items:[]});
    }
    const findCurrentProductIndex = cart.items.findIndex((item)=>item.productId.toString() === productId)
    console.log('findCurrentProductIndex: ', findCurrentProductIndex);
    if(findCurrentProductIndex === -1){
        cart.items.push({productId,quantity});
    }else{
        cart.items[findCurrentProductIndex].quantity += quantity
    }
    await cart.save();
    res.status(200).json({
        success:true,
        data:cart
    })
    }catch(error){
        console.log('error: ', error);
         res.status(500).json({
            success:false,
            message:"Some Error occured"
         })
    }
}

// get cart items


const fetchCartItems = async(req,res)=>{
    try{
 const {userId} =req.params;
 if(!userId){
    return res.status(400).json({
        success:false,
        message:"User id is mandatory!"
    })
 }
 const cart = await Cart.findOne({userId}).populate({
    path:'item.productId',
    select:'image title price salePrice'
 })
 if(!cart){
    return res.status(404).json({
        success:false,
        message:"Cart not found!"
    })
 }
//  validate if item is deleted from Admin side
const validItems = cart.items.filter(productItem=>productItem.productId)
if(validItems.length < cart.items.length){
    cart.items = validItems
    await cart.save()
}
const populateCartItems = validItems.map(item=>({
    productId:item.productId._id,
    image:item.productId.image,
    title:item.productId.title,
    price:item.productId.price,
    salePrice:item.productId.salePrice,
    quantity:item.quantity,
}))
res.status(200).json({
    success:true,
    data:{
        ...cart._doc,
        items:populateCartItems
    }
})
    }catch(error){
        console.log('error: ', error);
         res.status(500).json({
            success:false,
            message:"Some Error occured"
         })
    }
}

// update cart items
const updateCartItemQty = async(req,res)=>{
    try{
        // accept userId,productId,quantity from user
const {userId,productId,quantity} = req.body;
if(!userId || !productId || !quantity<=0){
    return res.status(400).json({
        success:false,
        message:"Invalid data provided!"
    })
}
// find particular user Cart
const cart = await Cart.findOne({userId})
if(!cart){
    return res.status(404).json({
        success:false,
        message:'Cart not found!'
    })
}
// find current product item index.
const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString()===productId)
console.log('findCurrentProductIndex: ', findCurrentProductIndex);

if(findCurrentProductIndex === -1){
    return res.status(404).json({
        success:false,
        message:'Cart item not present !'
    })
}
cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
        path:'items.productId',
        select:"image title price salePrice"
    })
    const populatedCartItems = cart.items.map((item)=>({
  productId : item.productId ? item.productId._id : null,
  image:item.productId ?  item.productId.image :null,
  title: item.productId ? item.productId.title:null,
  price:item.productId ? item.productId.price :null,
  salePrice:item.productId ? item.productId.salePrice:null,
  quantity:item.quantity,
    }))
    res.status(200).json({
        success:true,
        data:{
            ...data._doc,
            items:populatedCartItems
        }
    })
    }catch(error){
        console.log('error: ', error);
         res.status(500).json({
            success:false,
            message:"Some Error occured"
         })
    }
}

// Delete cart items
const deleteCartItem = async(req,res)=>{
    try{
const {userId,productId} = req.params;
if(!userId || !productId){
    return res.status(400).json({
        success:false,
        message:"Invalid data provided !"
    })
}
const cart = await Cart.findOne({userId}).populate({
    path:"items.productId",
    select:"image title price salePrice"
})
if(!cart){
    return res.status(404).json({
        success:false,
        message:"Cart not found !"
    })
}
cart.items = cart.items.filter(item=>item.productId._id.toString() !== productId)
await cart.save();
await Cart.populate({
    path:"items.productId",
    select:"image title price salePrice"
})
const populatedCartItems = cart.items.map((item)=>({
    productId : item.productId ? item.productId._id : null,
    image:item.productId ?  item.productId.image :null,
    title: item.productId ? item.productId.title:null,
    price:item.productId ? item.productId.price :null,
    salePrice:item.productId ? item.productId.salePrice:null,
    quantity:item.quantity,
      }))
      res.status(200).json({
          success:true,
          data:{
              ...data._doc,
              items:populatedCartItems
          }
      })
    }catch(error){
        console.log('error: ', error);
         res.status(500).json({
            success:false,
            message:"Some Error occured"
         })
    }
}


module.exports = {addToCart,fetchCartItems,updateCartItemQty,deleteCartItem}