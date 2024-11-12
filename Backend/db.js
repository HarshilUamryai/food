const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://FoodMarkat:Food@cluster0.7tkxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');

    const F_D = mongoose.connection.db.collection("Fooditem");

    const data = await F_D.find({}).toArray();
    global.Fooditem = data;
   // console.log(global.Fooditem);
    const F_C = mongoose.connection.db.collection("Foodcat");
    const datac = await F_C.find({}).toArray();

    global.Foodcat = datac;
   // console.log(global.Foodcat);
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
