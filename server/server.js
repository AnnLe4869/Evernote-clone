import express from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 8000;
const app = express();
app.use(morgan("dev"));

app.get("/auth", (_, res) => {
  res.json({
    name: "Hello World",
  });
});

app.listen(PORT, () => console.log(`Start the server at ${PORT}`));
