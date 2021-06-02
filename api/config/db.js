const mongoose = require('mongoose');
const connectDB = async () => {
  let MONGO_URI;
  if (process.env.NODE_ENV === 'development') {
    MONGO_URI = process.env.MONGO_URI_DEV;
  }
  if (process.env.NODE_ENV === 'production') {
    MONGO_URI = process.env.MONGO_URI_PROD;
  }
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      // avoid errors on console.
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
