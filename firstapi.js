// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const mongoose =require('mongoose');
const e = require('express');
const CustomerModel=require('./moduls/companies');
const Company = require('./moduls/companies');

mongoose.set('strictQuery',false);
// Create Express app
const app = express();
const port = process.env.PORT || 3004;


app.get('/api/comoanies',(req,res)=>{
    companies.save();
    res.send(companies);
})



app.get('/api/allcomoanies',async (req,res)=>{
    try {
        const result = await Company.find();
        // companies.save();
         res.send({"companies" :result});
        
    } catch (e) {
        res.status(500).json({error:e.message})
    }
   
})
// Middleware to parse JSON requests

const start=async()=>{
    try {
        await mongoose.connect('mongodb+srv://onkarbhandari123:onkar123@contractorfacilitate.b948c1k.mongodb.net/ContractorFacilitate?retryWrites=true&w=majority');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
          });
    } catch (error) {
        console.log(error.message);
        
    }
  
};

const companies=new  Company({
    
        "_id": 4,
        "name": "ABC Contractors",
        "services": ["Construction", "Electrical", "Plumbing"],
        "contact": {
          "email": "abc@contractors.com",
          "phone": "+1234567890",
          "address": {
            "street": "123 Main St",
            "city": "Cityville",
            "state": "State",
            "zip": "12345"
          }
        }
      

})

//companies.save();


start();
// Start the server

