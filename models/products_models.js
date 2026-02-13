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
    },

    update(idP, newP, callback){
        return db.query("UPDATE product SET name=?, price=?, saldo=? WHERE id_products=?",
        [
            newP.name,
            newP.price,
            newP.saldo,
            idP
        ], callback);
    },

    delete(idP, callback){
        return db.query("DELETE FROM product WHERE id_products=?",[idP],callback);
    }
}

module.exports=products;