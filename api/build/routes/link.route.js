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
const shortid_1 = __importDefault(require("shortid"));
const router = express_1.Router();
const Link = require("../models/Link");
router.post("/generate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, userId } = req.body;
    try {
        const baseUrl = "http://localhost:5000";
        const code = shortid_1.default.generate();
        const existing = yield Link.findOne({ from });
        if (existing)
            return res.json({ link: existing });
        const to = baseUrl + "/t/" + code;
        const link = yield new Link({
            code,
            to,
            from,
            owner: userId,
        });
        yield link.save();
        res.status(201).json(link).end();
    }
    catch (e) {
        console.log(e);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const links = yield Link.find({ owner: id });
        res.json(links).end();
    }
    catch (e) {
        console.log(e);
    }
}));
router.get("/detail/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const links = yield Link.findById(id);
        res.json(links).end();
    }
    catch (e) {
        console.log(e);
    }
}));
module.exports = router;
