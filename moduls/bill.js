const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;  

const billSchema = new mongoose.Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    default:() => new ObjectId(),
  },
  id:{
    type: Number,
  },
  invoice_no: {
    type: String,
    required: true,
  },
  contractor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bill_date: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
  },
  invoice_date: {
    type: String,
    required: true,
  },
  tax_rev_charge: {
    type: Boolean,
    default: false,
  },
  services: [
    {
      service_description: {
        type: String,
        required: true,
      },
      hours_worked: {
        type: Number,
        required: true,
      },
      rate_per_hour: {
        type: Number,
        required: true,
      },
    },
  ],
  total_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  bill_details: {
    service_description: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    cgst: {
      type: Number,
      required: true,
    },
    sgst: {
      type: Number,
      required: true,
    },
    grand_total: {
      type: Number,
      required: true,
    },
  },
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;