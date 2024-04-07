import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        reqiured: [true,"Please provide username"],
    },

    email:{
        type: String,
        reqiured: [true,"Please provide an email"],
        unique:true
    },

    password:{
        type: String,
        reqiured: [true,"Please provide a password"],
    },

    intrests:[String],

    isVerfied:{
        type: Boolean,
        default: false,
    },
    verifyToken: String,

    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model('users',userSchema);


export default User;