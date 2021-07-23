import { Router, Request, Response } from "express";
import shortid from "shortid";
const router = Router();
const Link = require("../models/Link");
import { Document } from "mongoose";

interface Destruction {
  from: string;
  userId: string;
}
export interface Link extends Document {
  code: string;
  to: string;
  from: string;
  owner: string;
  date?: Date;
  clicks: number;
}

router.post("/generate", async (req: Request, res: Response) => {
  const { from, userId }: Destruction = req.body;
  try {
    const baseUrl: string = "https://yshort.herokuapp.com";
    const code = shortid.generate();
    const existing: Link = await Link.findOne({ from });
    if (existing) return res.json({ link: existing });
    const to = baseUrl + "/t/" + code;
    const link: Link = await new Link({
      code,
      to,
      from,
      owner: userId,
    });
    await link.save();
    res.status(201).json(link).end();
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const links = await Link.find({ owner: id });
    res.json(links).end();
  } catch (e) {
    console.log(e);
  }
});

router.get("/detail/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const links = await Link.findById(id);
    res.json(links).end();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
