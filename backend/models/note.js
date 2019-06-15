const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    title: {
      type: String
    },
    body: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = {
  Note: mongoose.model('note', DataSchema)
}
