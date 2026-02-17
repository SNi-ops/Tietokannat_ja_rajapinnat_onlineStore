const express=require('express');
const customers=require('../models/customers_model');
const bcrypt=require('bcryptjs');

const router=express.Router();
const jwt=require('jsonwebtoken');


router.post('/', function(request, response){
    const username=request.body.username;
    const password=request.body.password;

    if(username && password){
        response.send(username, function(error, result){
            if(error){
                response.send(error);
            }
            else{
                if(result.lenght>0){
                    bcrypt.compare(password, result[0].password, function(error, compareResult){
                        if(error){
                            response.send(error);
                        }
                        else{
                            if(compareResult){
                                const token=createToken(username);
                                response.json(token);
                            }
                            else{
                                console.log("Vaara salasana");
                                response.status(403).json("Tunnus ja salasana eivat tasmaa");
                            }
                        }
                    });
                }
                else{
                    console.log("Tunnusta ei ole");
                    response.status(403).json("Tunnus ja salasana eivat tasmaa");
                }
            }
        });
    }
    else{
        console.log("tunnus tai salasana puuttuu");
        response.status(403).json("Tunnus ja salasana eivat tasmaa");
    }
});

function createToken(username){
    return jwt.sign({username},process.env.MY_TOKEN, {expiresIn:'1200s'});
}

module.exports=router;