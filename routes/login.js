const express=require('express');
const customers=require('../models/customers_model');
const bcrypt=require('bcryptjs');
const router=express.Router();
const jwt=require('jsonwebtoken');


router.post('/', function(request, response){
    const username=request.body.username;
    const password=request.body.password;
    if(username && password){
        customers.checkLogin(username, function(error, result){
            if(error){
                response.send(error);
            }
            else{
                if(result.length>0){
                    bcrypt.compare(password, result[0].password, function(error, compareResult){
                        if(error){
                            response.send(error);
                        }
                        else{
                            if(compareResult){
                                const token=createToken(username, result[0].role);
                                response.json(token);
                            }
                            else{
                                console.log("Väärä salasana");
                                response.status(403).json("Salasana on virheellinen");
                            }
                        }
                    });
                }
                else{
                    console.log("Tunnusta ei ole");
                    response.status(403).json("Tunnus ja salasana eivät täsmää");
                }
            }
        });
    }
    else{
        console.log("tunnus tai salasana puuttuu");
        response.status(403).json("Tunnus ja salasana eivat tasmaa");
    }
});

function createToken(username, role){
    return jwt.sign({username, role},process.env.MY_TOKEN, {expiresIn:'1200s'});
}

module.exports=router;