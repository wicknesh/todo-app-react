import express, { Router } from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import userModel from '../models/userData.js';

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userID = async () => {
            let id;
            do {
                id = Math.floor(10000 + Math.random() * 90000);
            } while (await userModel.findOne({ uid: id }));
            return id;
        };
        const uid = await userID();

        const newUser = new userModel({
            uid: uid,
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful!"});
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user"});
    }
})

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password'});
        }

        const userWithoutSensitiveInfo = user.toObject();
        delete userWithoutSensitiveInfo.password;
        delete userWithoutSensitiveInfo._id;

        res.status(200).json({
            message: 'Login successful!',
            user: userWithoutSensitiveInfo,
        })

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'An error occured during login'});
    }
})

export default router;