const db=require('../database');

const products={
    getAll(callback){
        return db.query("SELECT * FROM product",callback);
    },

    getOne(idP, callback){
        return db.query("SELECT * FROM product WHERE id_products=?",[idP], callback);
    },

    add(newP, callback){
        return db.query("INSERT INTO product (name,price,saldo) VALUES(?,?,?)",
        [
            newP.name,
            newP.price,
            newP.saldo
        ], callback);
    }
}

module.exports=products;