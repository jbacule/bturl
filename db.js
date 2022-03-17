const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const mongoUri = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Mongodb connected!')
  } catch (error) {
    console.log(error)
  }
}

const urlSchema = mongoose.Schema(
  {
    longUrl: { 
      type: String,
      required: true
    },
    shortUrl: { 
      type: String,
      required: true
    },
    urlCode: {
      type: String,
      required: true
    }, 
    createdAt: {
      type: Date,
      default: new Date()
    }
  }
);

const urlModel = mongoose.model('urls', urlSchema);

module.exports = {
  connectDB,
  urlModel
}