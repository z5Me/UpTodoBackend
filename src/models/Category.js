import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    iconname: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, timeseries: false })

export default mongoose.model('Category', categorySchema);