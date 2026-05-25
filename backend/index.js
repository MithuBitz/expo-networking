import express from "express";

const app = express();

app.get("/api/v1/hello-world", (req, res) => {
  return res.json({ data: "Hello world" }).status(200);
});

app.listen(3000, () => {
  console.log("Server is running");
});
