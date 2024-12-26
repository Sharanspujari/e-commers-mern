
const Product =require('../../models/Product')

const getFilteredProducts= async (req,res)=>{
    try{
// filter logic with query
const {category=[],brand=[],sortBy='price-lowtohigh'} = req.query
 let filters = {};
 
 if(category.length){
    filters.category = {$in:category.split(',')}
 }
 if(brand.length){
    filters.brand = {$in:brand.split(',')}
 }
 console.log('filters: ', filters);
 let sort = {}
 switch(sortBy){
    case 'price-lowtohigh':
         sort.price = 1
        break;
    case 'price-hightolow':
        sort.price = -1
        break;
    case 'title-atoz':
        sort.title = 1
        break;
     case 'title-ztoa':
       sort.title = -1
       break;
       default:
        sort.price=1
        break;

 }
 console.log('sort: ', sort);

const products = await Product.find(filters).sort(sort);
res.status(200).json({
    success:true,
    data:products
})
    }catch(error){
        console.log('error: ', error);
    res.status(500).json({
        success:false,
        message:"Some error occured"
    })
    }
}

module.exports = {getFilteredProducts};