const express=require('express');
const router=express.Router();
const customers=require('../models/customers_model');

router.post('/', function(request, response){
    customers.add(request.body, function(error, result){
        if(error){
            response.send(error);
        }
        else{
            response.json(result);
        }
    });
});



module.exports=router;