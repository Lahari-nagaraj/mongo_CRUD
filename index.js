const express = require('express')
const Product = require('./models/product.model.js')
const mongoose = require('mongoose');
const app = express()

app.use(express.json());//middleware for json
app.use(express.urlencoded({extended: false}));//for formdata(inthe form of key-value pairs)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");

})
app.get('/',(req,res)=>{
    res.send("HEllo ");
})

//to read it 
app.get('/api/products',async(req,res) =>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//to get specific with id
app.get('/api/products/:id',async(req,res) =>{
    try{
        const { id }= req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//to add
app.post('/api/products',async(req,res) =>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

//update a product
app.put('/api/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    }catch(error){
        res.status(500).json({message: error.message});
    }
});


//delete 
app.delete('/api/products/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});

    }catch(error){
        res.status(500).json({message: error.message});
    }
})


mongoose.connect('mongodb+srv://lahari:hari123@backend1.qgejwao.mongodb.net/?retryWrites=true&w=majority&appName=backend1')
  .then(() =>{ console.log('Connected!')})
  .catch(()=>{ console.log("Connection failed");

  });