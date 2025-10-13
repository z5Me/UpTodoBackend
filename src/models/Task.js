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
        type: Date
    },
    priority: {
        type: Number
    }
}, { timestamps: true, timeseries: false });

export default mongoose.model('Task', taskSchema);