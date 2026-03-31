const mongoose = require('mongoose');

const connectDb =  () => {
    try {
        mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('MongoDB connected successfully');
    })
    } catch (err) {
        console.log(err)
    }
}
module.exports=connectDb;