import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: null
    },
    nameProfile: {
        type: String,
        default: function () {
            return this.userName;
        }
    },
    avatar: {
        type: String,
        default: null
    }
}, { timestamps: true, timeseries: false });

export default mongoose.model('User', userSchema);