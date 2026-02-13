const db=require('../database');
const bcrypt=require('bcryptjs');
const saltrounds=12;

const customers={

    add(newC,callback){
        bcrypt.hash(newC.password, saltrounds, function(error, hashedPassword){
            if(error){
                return callback(error.message);
            }
            else{
                return db.query("INSERT INTO customers VALUES(?,?,?,?)",
                    [
                        newC.username,
                        newC.fname,
                        newC.lname,
                        hashedPassword
                    ],callback);
            }
        });
    }

}

module.exports=customers;