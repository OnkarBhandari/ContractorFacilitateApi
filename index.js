// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const mongoose =require('mongoose');
const e = require('express');
const CustomerModel=require('./moduls/companies');
const Company = require('./moduls/companies');

mongoose.set('strictQuery',false);
const app = express();
const port = process.env.PORT || 3007;
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 },
  });
  const Counter = mongoose.model('Counter', counterSchema);


  app.use(bodyParser.json());
app.post('/api/companies', async (req, res) => {
    try {
        let counter = await Counter.findById('companyId');

        if (!counter) {
            // If the counter document doesn't exist, create a new one
            counter = new Counter({ _id: 'companyId', sequence_value: 1 });
            await counter.save();
        }
        const updatedCounter = await Counter.findByIdAndUpdate('companyId', { $inc: { sequence_value: 1 } });


      const newCompany = new Company({
        _id: updatedCounter.sequence_value,
        ...req.body,
      });
      const savedCompany = await newCompany.save();
      res.json(savedCompany);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all companies
  app.get('/api/companies', async (req, res) => {
    try {
      const companies = await Company.find();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a specific company by ID
  app.get('/api/companies/:id', async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      res.json(company);
    } catch (error) {
      res.status(404).json({ error: 'Company not found' });
    }
  });
  
  // Update a company by ID
  app.put('/api/companies/:id', async (req, res) => {
    try {
      const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCompany);
    } catch (error) {
      res.status(404).json({ error: 'Company not found' });
    }
  });
  
  // Delete a company by ID
  app.delete('/api/companies/:id', async (req, res) => {
    try {
      const deletedCompany = await Company.findByIdAndRemove(req.params.id);
      res.json(deletedCompany);
    } catch (error) {
      res.status(404).json({ error: 'Company not found' });
    }
  });
  
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




start();
