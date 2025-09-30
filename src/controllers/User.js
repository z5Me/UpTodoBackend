import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { generateToken } from '../utils/helperUser.js';

export const SignUp = async (req, res) => {
    const { userName, password } = req.body;
    try {
        //Kiểm tra tồn tại
        const exitUser = await User.findOne({ userName: userName });
        if (exitUser) return res.status(409).json({ message: 'Username đã tồn tại' });
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Lưu
        const newUser = await User.create({ userName, password: hashedPassword });
        return res.status(201).json(newUser);
    } catch (error) {
        console.log('Error at SignUp', error);
        return res.status(500).json({ message: 'Internal server' });
    }
}

export const SignIn = async (req, res) => {
    const { userName, password } = req.body;
    try {
        //kiểm tra account đã được tạo hay chưa
        const exitUser = await User.findOne({ userName: userName });
        if (!exitUser) return res.status(404).json({ message: 'Tài khoản chưa được đăng kí' });
        //Check password
        const isMatch = bcrypt.compare(password, exitUser.password);
        if (!isMatch) return res.status(401).json({ message: 'Sai mật khẩu' });
        //tạo token
        const token = generateToken({ _id: exitUser._id, userName: exitUser.userName });
        //Trả dữ liệu
        const data = { ...exitUser._doc, password: '' };
        return res.status(200).json({ data: data, token: token });
    } catch (error) {
        console.log('Error at SignIn', error);
        return res.status(500).json({ message: 'Internal server' });
    }
}