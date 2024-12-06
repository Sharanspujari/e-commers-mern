const express = require('express');

const {handleImageUpload,addNewProduct,getAllProduct,editProduct,deleteProduct} = require('../../controllers/admin/products-controller')
const {upload} = require('../../helpers/cloudinary')
const router = express.Router();

router.post("/upload-image",upload.single("my_file"),handleImageUpload)
router.post("/add-product",addNewProduct)
router.put("/edit-product/:id",editProduct)
router.delete("/delete-product/:id",deleteProduct)
router.get("/get-products",getAllProduct)
module.exports = router;