import express from "express";
import path from "path";

import router from "./routes";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

const PORT = process.env["PORT"] || 3000;
const app = express();
app.use(express.json());

const ___baseDir = path.resolve();
console.log(___baseDir);

app.use("/api/v1", router);
app.use(errorHandlerMiddleware);

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
