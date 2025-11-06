import Category from "../models/Category.js";

export const getAllCategory = async (req, res) => {
    const { skip, limit } = req.query;
    try {
        const getAll = await Category.find({ isDelete: false })
            .skip(skip || 0)
            .limit(limit || 99)
            .sort({ createdAt: -1 });

        const total = await Category.countDocuments({ isDelete: false });

        return res.status(200).json({ status: 'Thành công', skip, limit, total, data: getAll });
    } catch (error) {
        console.log('Lỗi ở getAllCategory', error);
        return res.status(500).json({ status: 'Thất bại', message: 'Internal Server', error });
    }
}

export const addCategory = async (req, res) => {
    const { name, iconname, color } = req.body;
    try {
        const newCategory = await Category.create({ name, iconname, color });

        return res.status(201).json({ status: 'Thành công', data: newCategory });
    } catch (error) {
        console.log('Lỗi ở AddCategory', error);
        return res.status(500).json({ status: 'Thất bại', message: 'Internal Server', error });
    }
}

export const removeCategory = async (req, res) => {
    const { idCategory } = req.query;
    try {
        const findCategory = await Category.findOne({ _id: idCategory });

        if (!findCategory) return res.status(404).json({ status: 'Thất bại', message: 'Không tìm thấy category' });

        findCategory.isDelete = true;
        await findCategory.save();

        return res.status(200).json({ status: 'Thành công', data: findCategory });
    } catch (error) {
        console.log('Lỗi ở removeCategory', error);
        return res.status(500).json({ status: 'Thất bại', message: 'Internal Server', error });
    }
}