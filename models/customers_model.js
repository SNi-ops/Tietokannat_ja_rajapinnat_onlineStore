const db=require('../database');
const bcrypt=require('bcryptjs');
const { update } = require('./products_models');
const saltrounds=12;

const customers={

    getAllCustomers(callback){
        return db.query("SELECT * FROM customers", callback);
    },

    getOneCustomer(uN, callback){
        return db.query("SELECT * FROM customers WHERE username=?",[uN], callback);
    },

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
                    ], callback);
            }
        });
    },

    updateCustomer(uN, newC, callback){
        bcrypt.hash(newC.password, saltrounds, function(error, hashedPassword){
            if(error){
                return callback(error.message);
            }
            else{
                return db.query("UPDATE customers SET fname=?, lname=?, password=? WHERE username=?", 
                    [
                    newC.fname,
                    newC.lname,
                    hashedPassword,
                    uN
                    ], callback);
            }
        });
    },

    updatePassword(uN, newC, callback){
        bcrypt.hash(newC.password, saltrounds, function(error, hashedPassword){
            if(error){
                return callback(error.message);
            }
            else{
                return db.query("UPDATE customers SET password =? WHERE username =?", 
                [
                    hashedPassword,
                    uN

                ]);
            }
        })
    },

    deleteCustomers(uN, callback){
        return db.query("DELETE FROM customers WHERE username=?",[uN],callback);
    }

}

module.exports=customers;