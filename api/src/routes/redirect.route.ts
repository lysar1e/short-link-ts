import { Router, Request, Response } from "express";
const Link = require("../models/Link");
import { Link } from "./link.route";

const router = Router();

router.get("/:code", async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const link: Link = await Link.findOne({ code });
    if (link) {
      const { from } = link;
      link.clicks++;
      await link.save();
      return res.redirect(from);
    }
    return res.status(404).json("Ссылка не найдена");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
