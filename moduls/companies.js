const mongoose =require('mongoose');   

const companiesSchame =new mongoose.Schema(
    {
        _id: {
            type: Number,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          services: {
            type: [String],
            required: true,
          },
          contact: {
            email: {
              type: String,
              required: true,
            },
            phone: {
              type: String,
              required: true,
            },
            address: {
              street: {
                type: String,
                required: true,
              },
              city: {
                type: String,
                required: true,
              },
              state: {
                type: String,
                required: true,
              },
              zip: {
                type: String,
                required: true,
              },
            },
          },
    }
);
const Company = mongoose.model('Company', companiesSchame);
module.exports = Company;