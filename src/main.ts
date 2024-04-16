import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // Import Mongoose
import Config from "./config";
import router from "./routes";

const app = express();

mongoose.connect(Config.MONGODB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use(router);

app.listen(Config.PORT, () => {
  console.log(`Listening on ${Config.PORT}`);
});
