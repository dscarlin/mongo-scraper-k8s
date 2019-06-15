const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    image: {
      type: String
    },
    category: {
      type: String
    },
    title: {
      type: String
    },
    caption: {
      type: String
    },
    link: {
      type: String
    },
    author: {
      type: String
    },
    authorLink: {
      type: String
    },
    saved: {
      type: Boolean,
      default: false
    },
    notes: [
      {
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: 'note'
      }
    ]
  },
  { timestamps: true }
)

// export the new Schema so we could modify it using Node.js
module.exports = {
  Article: mongoose.model('article', DataSchema),
}
