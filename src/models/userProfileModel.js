import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
    username : { type: String, required: true, unique: true},
    email : { type: String, required: true, unique: true},

})

const UserProfile = mongoose.model("UserProfile", UserProfileSchema)
export default UserProfile;
