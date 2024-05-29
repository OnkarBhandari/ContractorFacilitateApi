// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const mongoose =require('mongoose');
const e = require('express');
const CustomerModel=require('./moduls/companies');
const Company = require('./moduls/companies');
const contractor = require('./moduls/contractor');
const bill = require('./moduls/bill');
                          


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
            counter = new Counter({ id: 'companyId', sequence_value: 1 });
            await counter.save();
        }
        const updatedCounter = await Counter.findByIdAndUpdate('companyId', { $inc: { sequence_value: 1 } });


      const newCompany = new Company({
        id: updatedCounter.sequence_value,
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
      const companyOb = req.query._id;
      const companyId = req.query.id;

      if (null!=companyOb) {
        const company = await Company.findById(companyOb);
        res.json(company);
      }else if(null!=companyId){
        const company = await Company.findOne({id:companyId});
        res.json(company);
      }
      else{
        const companies = await Company.find();
        res.json(companies);
      }
      




      
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
  //get all contractors
  app.get('/api/contractors', async (req, res) => {
    try {
      const contractors = await contractor.find();
      res.json(contractors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.post('/api/contractors', async (req, res) => {
    try{ 
       let counter = await Counter.findById('contractorId');
  
          if (!counter) {
              // If the counter document doesn't exist, create a new one
              counter = new Counter({ _id: 'contractorId', sequence_value: 1 });
              await counter.save();
          }
          const updatedCounter = await Counter.findByIdAndUpdate('contractorId', { $inc: { sequence_value: 1 } });
  
  
        const newContractor = new contractor({
          id: updatedCounter.sequence_value,
          _id: new ObjectId(),
          ...req.body,
        });
        const savedContractor = await newContractor.save();
        res.json(savedContractor);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
//bill apis will start from hear
//this will add bill to the record 
app.post('/api/bill', async (req, res) => {
  try {
    const {
      invoice_no,
      contractor_id,
      company_id,
      bill_date,
      invoice_date,
      tax_rev_charge,
      services,
      total_amount,
      status,
      bill_details,
    } = req.body;

    // Ensure that contractor_id and company_id are valid ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(contractor_id) || !mongoose.Types.ObjectId.isValid(company_id)) {
      return res.status(400).json({ error: 'Invalid ObjectID format for contractor_id or company_id' });
    }
     let counter = await Counter.findById('billId');

        if (!counter) {
            // If the counter document doesn't exist, create a new one
            counter = new Counter({ _id: 'billId', sequence_value: 1 });
            await counter.save();
        }
        const updatedCounter = await Counter.findByIdAndUpdate('billId', { $inc: { sequence_value: 1 } });


      const newBill = new bill({
        id: updatedCounter.sequence_value,
        ...req.body,
      });
      const savedBill = await newBill.save();
      res.json(savedBill);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  /// to get all bills
  app.get('/api/bill', async (req, res) => {
    try {
      const date = req.query.date;
      if(null!=date){ 
     const yearQueryParam= parseInt(date);
      const bills = await bill.find({ 'bill_date.year': { $eq: yearQueryParam }});//$gt for grater than
      res.json(bills);
    }
    else{
      const bills = await bill.find();//$gt for grater than
      res.json(bills);
    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.get('/api/get_updated_new_month_bill', async (req, res) => {
    try {
      const currentDate = new Date();
      const contractor_id = req.query.contractor_id;
      var month=currentDate.getMonth()+1;
      var year=currentDate.getFullYear();
      if(month==1){
        month=3;                   
        year=2023;
      }
      // const yearQueryParam= parseInt(date);
      const bills = await bill.find({contractor_id:{$eq:contractor_id} ,'bill_date.year': { $eq: year },'bill_date.month': { $eq: month }});//$gt for grater than
      if (bills.length > 0) {
        // Update invoice_date for each bill
        const updatePromises = bills.map(async (bill) => {
          bill.invoice_no = 100 // Update invoice_date to current date
          bill.invoice_date = currentDate.getDay()+"-"+currentDate.getMonth()+1+"-"+currentDate.getFullYear();
          return bill;
        });
      }
      res.json(bills);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.get('/api/all_bills', async (req, res) => {
    try {

      //to get all bills with name of contracor
      const contractor_id = req.query.contractor_id;
    
      
      // const yearQueryParam= parseInt(date);
      const bills = await bill.find({contractor_id:{$eq:contractor_id} });//$gt for grater than
      if (bills.length > 0) {
        // Update invoice_date for each bill
       
      }
      res.json(bills);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/api/print_bill', async (req, res) => {
  

    

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
