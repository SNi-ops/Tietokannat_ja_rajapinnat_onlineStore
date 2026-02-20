const express=require('express');
const app=express();
const PORT=3000;
const productsRouter=require('./routes/products');
const customersRouter=require('./routes/customers');
const loginRouter=require('./routes/login');
const ordersRouter=require('./routes/orders_handler');
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');


app.use(express.json());
dotenv.config();

//Antaa pääsyn selaimen kautta
app.get('/',function(request, response){
    response.send("Verkkokauppa API");
});

//Endpointin kautta päästään käsiksi tiedostoihin
app.use('/login', loginRouter);
app.use(authenticateToken);
//suojatutu reiti vaativat tokenin
app.use('/products', productsRouter);
app.use('/customers', customersRouter);
app.use('/orders_handler', ordersRouter);


//Kuuntelee määritetyn portin (3000) liikennettä ja tulostaa console logilla vastauksen
app.listen(process.env.PORT, function(){
    console.log("Palvelin kuuntelee porttia "+process.env.PORT);
});

// Middleware function that verifies JWT token and blocks unauthorized requests
function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return response.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return response.sendStatus(401);
    }

    jwt.verify(token, process.env.MY_TOKEN, function(error, user) {
      if (error) {
        return response.sendStatus(403);
      }
      request.user = user;
      next();
    })
  }

module.exports=app;