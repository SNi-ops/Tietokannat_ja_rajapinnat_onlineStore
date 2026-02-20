const db=require('../database');

const orders={
    accCart(username, payment_method, callback){
        return db.query("INSERT INTO cart(username, payment_method) VALUES(?,?)",
        [
            username,
            payment_method

        ], callback);
    },
    addProductsToCart(newC, callback){
        return db.query("INSERT INTO onlinestore.order(id_cart, id_products, ammount) VALUES(?,?,?)",
            [
                newC.id_cart,
                newC.id_products,
                newC.ammount

            ], callback);
    }
}

module.exports=orders;