const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    state: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = {
  State: mongoose.model('state', DataSchema)
}
