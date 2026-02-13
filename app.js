const express=require('express');
const app=express();
const PORT=3000;
const productsRouter=require('./routes/products');

app.use(express.json());

//Antaa pääsyn selaimen kautta
app.get('/',function(request, response){
    response.send("Verkkokauppa API");
});

app.use('/products', productsRouter);

//Kuuntelee määritetyn portin (3000) liikennettä ja tulostaa console logilla vastauksen
app.listen(PORT, function(){
    console.log("Palvelin kuuntelee porttia "+PORT);
});

module.exports=app;