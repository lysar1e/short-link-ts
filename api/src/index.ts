import express from "express";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
const PORT = process.env.PORT || 5000;
app.use(cors());
// @ts-ignore
app.use(express.json({ extended: true }));
app.use("/api/link", require("./routes/link.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/t/", require("./routes/redirect.route"));
async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://yera:yera@cluster0.fxspz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );

    app.listen(PORT, () => {
      console.log(`Server has started on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
