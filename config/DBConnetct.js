const mongoose = require("mongoose")
require ("dotenv").config({path : '../.env'});

module.exports = DBConnect = async () =>{
    mongoose.connect(process.env.MONGO_URL, {

        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err =>{
        if(err) throw err;
        console.log('Connected to MongoDB')
    })
mongoose.set('strictQuery', true); // or false depending on your preference

}