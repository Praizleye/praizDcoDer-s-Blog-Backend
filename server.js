require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//built in middlewares
app.use(express.json());

//custom middleware
app.use(express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

app.use("/api/posts", blogRoutes);

app.all("*", (req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//? Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
//? Included because it removes preparatory warnings for Mongoose 7.

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Mongodb connection was successful");
      console.log(`Server listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
