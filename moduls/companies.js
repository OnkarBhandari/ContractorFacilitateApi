const mongoose =require('mongoose');   

const companiesSchame =new mongoose.Schema(
    {
         _id: Number,
          name: String,
          contact: {
            address: {
              street: String,
              city: String,
              state: String,
              zip: String,
            },
            email: String,
            phone: String,
          },
          service: {
            service_name: String,
            qty: Number,
            rate_per_service: Number,
          },
          gst: {
            registration_number: String,
            rate: Number,
            state_code: Number,
            state: String,
          },
        }
);
const Company = mongoose.model('Company', companiesSchame);
module.exports = Company;