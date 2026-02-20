const db=require('mysql2');
const dotenv=require('dotenv');
dotenv.config();

//const connectionString='msql://storeUser:storePass@127.0.0.1/onlineStore';

const conn=db.createPool(process.env.MYSQL_SERVER);



module.exports=conn;