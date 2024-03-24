const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
        
    },
    CIN:{ 
        type:Number,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
   childN:{
    type:String,
   },
   classChild:{
type: Number,
required: true

   },
   Ntel:{
    type : Number,
    required: true,
    unique: true
   }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)