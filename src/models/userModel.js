import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [ true, "Username is required" ], 
        unique: [ true, "Username must be unique" ]
    },
     email: {
        type: String, 
        required: [ true, "email is required" ], 
        unique: [ true, "email must be unique" ]
    },
    createdAt: { type: Date, default: Date.now }

})

const User = mongoose.model('User', UserSchema)

export default User