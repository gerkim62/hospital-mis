import express from "express";
import path from "path";

import router from "./routes";

const PORT = process.env["PORT"] || 5000;
const app = express();

const ___baseDir = path.resolve();
console.log(___baseDir);

app.use("/api/v1", router);

if (process.env["NODE_ENV"] === "production") {
  console.log("Server running in production mode");
  app.use(express.static(path.join(___baseDir, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(___baseDir, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
