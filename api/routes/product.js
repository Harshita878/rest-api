const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/product');
const checkAuth = require('../middleware/check-auth');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'de5voeb4d',
    api_key: '166776838734311',
    api_secret: '0WT_14vtSUjYeipYFM9A7e_bI4M'
});


//get request
router.get('/',checkAuth,(req,res,next)=>{
    Product.find()
    .then(result=>{
        res.status(200).json({
            Product:result
        }) 
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Product.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            Product:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.post('/',(req,res,next)=>{

    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(error,result)=>{
        console.log(result);
        const product = new Product({
            _id:new mongoose.Types.ObjectId,
            code:req.body.code,
            title:req.body.title,
            description:req.body.description,
            mrp:req.body.mrp,
            sp:req.body.sp,
            discountPercent:req.body.discountPercent,
            imagePath:result.url
    
        });
    
        product.save()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                newproduct:result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    })


})


//delete request
router.delete('/:id',checkAuth,(req,res,next)=>{
    Product.findByIdAndDelete({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message: 'Product deleted',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

//update request
router.put('/:id',checkAuth,(req,res,next)=>{
    Product.findOneAndUpdate({_id:req.params.id},{
        $set:{
            code:req.body.code,
            title:req.body.title,
            description:req.body.description,
            mrp:req.body.mrp,
            sp:req.body.sp,
            discountPercent:req.body.discountPercent,
            imagePath:req.body.imagePath
        }
        })
        .then(result=>{
            res.status(200).json({
                updated_product:result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
})





module.exports = router;

