import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        minlength: [2, 'Task name phải có ít nhất 2 ký tự'],
        maxlength: [100, 'Task name không vượt quá 100 ký tự'],
        required: [true, 'Task name là bắt buộc'],
        trim: true
    },
    desc: {
        type: String,
        maxlength: [100, 'Description không vượt quá 100 ký tự'],
        trim: true
    },
    date: {
        type: Date,
        default: null,
    },
    priority: {
        type: Number,
        default: 999
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    complete: {
        type: Boolean,
        default: false,
    },
    isDelete: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, timeseries: false });

export default mongoose.model('Task', taskSchema);