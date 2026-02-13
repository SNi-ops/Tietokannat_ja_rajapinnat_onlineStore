const express=require('express');
const app=express();
const PORT=3000;
const productsRouter=require('./routes/products');
const customersRouter=require('./routes/customers');

app.use(express.json());

//Antaa pääsyn selaimen kautta
app.get('/',function(request, response){
    response.send("Verkkokauppa API");
});

//Endpointin kautta päästään käsiksi tiedostoihin
app.use('/products', productsRouter);
app.use('/customers', customersRouter);

//Kuuntelee määritetyn portin (3000) liikennettä ja tulostaa console logilla vastauksen
app.listen(PORT, function(){
    console.log("Palvelin kuuntelee porttia "+PORT);
});

module.exports=app;