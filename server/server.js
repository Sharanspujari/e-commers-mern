const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors')
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require("./routes/admin/products-routes")
const shopProductRouter = require("./routes/shop/products-routes")
// create a database connection => 
// u can also create a seperate file for thisand then import /use that file here
 
mongoose.connect('mongodb+srv://sharanspujari142:sharansp142@cluster0.rpej0.mongodb.net/').then(()=>console.log('MongoDB connected')).catch((error)=>console.log(error)) //return promise 
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin : 'http://localhost:5173',
    methods : ['GET' , 'POST' ,'DELETE' ,'PUT'],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        'Cache-control',
         "Expires",
         'Pragma'

    ],
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter)
app.use("/api/admin/products",adminProductsRouter);
app.use("/api/shop/products",shopProductRouter)

app.listen(port,()=>console.log(`Server is now running on ${port}`))