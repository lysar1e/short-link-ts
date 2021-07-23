"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post('/registration', [
    check('email', 'Неккоректный email!').isEmail(),
    check('password', 'Неккоректный пароль').isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при регистрации!'
            });
        }
        const { email, password } = req.body;
        const isUsed = yield User.findOne({ email });
        if (isUsed) {
            return res.status(400).json({ message: 'Данный email уже занят!' });
        }
        const hashedPassword = yield bcrypt.hash(password, 12);
        const user = new User({
            email, password: hashedPassword
        });
        yield user.save();
        res.status(201).json({ message: 'Пользователь успешно создан!' });
    }
    catch (e) {
        console.log(e);
    }
}));
router.post('/login', [
    check('email', 'Неккоректный email!').isEmail(),
    check('password', 'Неккоректный пароль').exists()
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при авторизации!'
            });
        }
        const { email, password } = req.body;
        const user = yield User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден!' });
        }
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль!' });
        }
        const jwtSecret = 'fhiahifhio3yi1yior31ihf1y90143941hf1whifhsaf13rf';
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token, userId: user.id });
    }
    catch (e) {
        console.log(e);
    }
}));
module.exports = router;
