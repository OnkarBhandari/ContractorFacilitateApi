const mongoose =require('mongoose');
const { ObjectId } = mongoose.Types;     
const contractorSchema = new mongoose.Schema({
    id: Number,
    _id:{
      type: mongoose.Schema.Types.ObjectId,
          default:() => new ObjectId(),
    },
    name: {
      type: String,
      required: true
    },
    contact: {
      address: {
        street: String,
        city: String,
        state: String,
        zip: String
      },
      email: String,
      phone1: String,
      phone2: String
    },
    service: String,
    gst: {
      registration_number: String,
      rate: {
        type: Number,
        default: 0.18
      },
      state_code: Number,
      state: String
    },
    pan: String
  });
  const Contractor = mongoose.model('contractors', contractorSchema);

  module.exports = Contractor;