const express=require('express');
const router=express.Router();
const products=require('../models/products_models');
const { request } = require('../app');

//const { resource } = require('../app');

router.get('/',function(request, response){
    products.getAll(function(error, result){
        if(error){
            response.send(error);
        }
        else{
            response.json(result);
        }
    });
});

router.get('/:id', function(request, response){
    products.getOne(request.params.id, function(error, result){
         if(error){
            response.send(error);
        }
        else{
            response.json(result[0]);
        }
    });
});

router.post('/',function(request, response){
    products.add(request.body, function(error, result){
        if(error){
            response.send(error);
        }
        else{
            response.json(result);
        }
    });
});

module.exports=router;