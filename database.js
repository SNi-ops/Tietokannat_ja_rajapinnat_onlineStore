const db=require('mysql2');

const connectionString='msql://storeUser:storePass@127.0.0.1/onlineStore';

const conn=db.createPool(connectionString);

module.exports=conn;