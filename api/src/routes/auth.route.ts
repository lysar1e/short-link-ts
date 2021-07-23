import {Router, Request, Response} from 'express';
const router = Router();
const User = require('../models/User');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
import jsonwebtoken from 'jsonwebtoken';

router.post('/registration',
    [
        check('email', 'Неккоректный email!').isEmail(),
        check('password', 'Неккоректный пароль').isLength({ min: 6 })
    ]
    ,
    async (req:Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неккоректные данные при регистрации!'
                });
            }
            const {email, password} = req.body;

            const isUsed = await User.findOne({email});

            if (isUsed) {
                return res.status(400).json({message: 'Данный email уже занят!'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                email, password: hashedPassword
            });

            await user.save();

            res.status(201).json({message: 'Пользователь успешно создан!'});
        }catch (e) {
            console.log(e);
        }
    });

router.post('/login',
    [
        check('email', 'Неккоректный email!').isEmail(),
        check('password', 'Неккоректный пароль').exists()
    ]
    ,
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неккоректные данные при авторизации!'
                });
            }
            const {email, password} = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден!'});
            }

            const isMatch = await bcrypt.compare(password, user.password);


            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль!' });
            }

            const jwtSecret = 'fhiahifhio3yi1yior31ihf1y90143941hf1whifhsaf13rf';

            const token = jsonwebtoken.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '1h'}
            );

            res.json({token, userId: user.id});

        } catch (e) {
            console.log(e);
        }
    });

module.exports = router;