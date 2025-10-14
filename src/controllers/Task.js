import Task from "../models/Task.js";

export const getAllTask = async (req, res) => {
    const { skip, limit } = req.query;
    try {
        const listTask = await Task.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await Task.countDocuments();

        return res.status(200).json({
            status: 'Thành công',
            total,
            skip,
            limit,
            data: listTask,
        });
    } catch (error) {
        console.log('error at get all task', error);
        return res.status(500).json({ status: 'Thất bại', message: 'Lỗi server', error });
    }
}

export const AddTask = async (req, res) => {
    const { task, desc, date, priority } = req.body;
    try {
        const newTask = await Task.create({ task, desc, date, priority });
        return res.status(201).json({
            status: 'Thành công',
            data: newTask
        });
    } catch (error) {
        console.log('error at AddTask', error);
        if (err.name === "ValidationError") {
            // Lấy tất cả message lỗi từ từng field
            const messages = Object.values(err.errors).map(e => e.message);

            return res.status(400).json({
                status: 'Thất bại',
                message: messages[0], // hoặc gửi toàn bộ mảng nếu muốn -> messages
                listMessage: messages,
                error
            });
        }
        return res.status(500).json({ status: 'Thất bại', message: 'Lỗi server', error })
    }
}