const cloudinary= require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name:'djizxkuqp',
    api_key:'464394989923715',
    api_secret:'nV7ECj2_-8y13OkzMGSl-T2Xjmw'
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
     const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
     })
     return result;
}

const upload = multer({storage})

module.exports ={upload,imageUploadUtil}