const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const User = require('../../models/User')
// reigster
const registerUser = async(req,res)=>{
  const {userName,email,password} = req.body;
  
    try{
        const checkUser = await User.findOne({email});
        if(checkUser){
        return res.json({success:false,message:"User Already exists with the same email! please try again"})
        }
const hashPassword = await bcrypt.hash(password,12);

const newUser = new User({
    userName,email,password:hashPassword
})

await newUser.save()
res.status(200).json({
    success:true,
    message:'registration successful'
})
    }catch(e){
        
        res.status(500).json({
            success:false,
            message:"Some error occured"
        })
    }
}


//login

const loginUser = async(req,res)=>{
   const {email,password} = req.body 
    try{
   const checkUser = await User.findOne({email});
   
     if(!checkUser) return res.json({
        success:false,
        message:"User doesn't exists please register first"
     })

     const checkPasswordMatch = await bcrypt.compare(password,checkUser.password)
     if(!checkPasswordMatch) return res.json({
       success:false,
       message:"Incorrect password please try again" 
     })

     const token = jwt.sign({
        id:checkUser._id,role:checkUser.role,email:checkUser.email
     },'CLIENT_SECRET_KEY',{expiresIn:'60m'})

     res.cookie('token',token,{httpOnly:true,secure:false}).json({
        success:true,
        message:'Logged in Successfully',
        user:{
            email:checkUser.email,
            role:checkUser.role,
            id:checkUser._id
        }
     })
    }catch(e){
        
        res.status(500).json({
            success:false,
            message:"Some error occured"
        })
    }
}

// logout

const logoutUser = (req,res)=>{
    res.clearCookie("token").json({
      success:true,
      message:"Logged out successfully!"  
    })
}
//auth middleware
const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    console.log('token: ', token);
    if(!token) return res.status(401).json({
        success:false,
        message:'Unauthorized user!'
    })
    try{
const decoded = jwt.decode(token,'CLIENT_SECRET_KEY')
console.log('decoded: ', decoded);

req.user = decoded;

next()
    }catch(error){
      res.status(401).json({
        success:false,
        message:'Unauthorized'
      })
    }
}
module.exports = {registerUser,loginUser,logoutUser,authMiddleware}