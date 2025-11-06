import Category from "../models/Category.js";
import Task from "../models/Task.js";

export const getAllTask = async (req, res) => {
    const { skip, limit, status } = req.query;
    try {
        let listTask = await Task.find({ isDelete: false })
            .populate([
                { path: 'category', modal: 'Category' }
            ])
            .skip(skip || 0)
            .limit(limit || 99)
            .sort({ createdAt: -1 });
        const total = await Task.countDocuments({ isDelete: false });
        if (status === 'TODAY') {
            const dateNow = new Date();
            listTask.filter((item) => {
                if (item.data) return false;
                const taskDate = new Date(item.date);

                return (
                    taskDate.getDate() === dateNow.getDate() &&
                    taskDate.getMonth() === dateNow.getMonth() &&
                    taskDate.getFullYear() === dateNow.getFullYear()
                )
            })
        }
        if (status === 'TOMORROW') {

        }
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
    const { task, desc, date, priority, idCategory } = req.body;
    try {
        const checkCategory = await Category.findOne({ _id: idCategory });
        if (!checkCategory) return res.status(404).json({ status: 'Thất bại', message: 'Không tìm thấy category' });

        const newTask = await Task.create({ task, desc, date: date, priority: priority, category: idCategory });
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