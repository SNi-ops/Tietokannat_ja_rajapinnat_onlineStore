const express=require('express');
const router=express.Router();
const orders=require('../models/orders_model');

router.post('/cart', function(request, response){
    orders.accCart(request.user.username, request.body.payment_method, function(error, result){
        if(error){
            response.send(error);
        }
        else{
            response.json(result);
        }
    });
});

router.post('/order', function(request, response){
    orders.addProductsToCart(request.body, function(error, result){
        if(error){
            response.send(error);
        }
        else{
            response.json(result);
        }
    });
});

module.exports=router;