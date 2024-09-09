const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    console.log(`mongoose trying to connect to mongodb : ${process.env.MONGODB_URL}`);
    try {
     await mongoose.connect(process.env.MONGODB_URL);
     console.log("success mongoose connection");
    }
    catch (err) {
      console.error(`mongoose connection error : ${err}`);
    }
}

connectToMongoDB();