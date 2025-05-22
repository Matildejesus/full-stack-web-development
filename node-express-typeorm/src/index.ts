import "reflect-metadata";
import express from "express";
import * as dataSourceModule from "./data-source";
console.log("Data source module:", dataSourceModule);

import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes";
// import applicationRoutes from "./routes/application.routes";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

console.log("AppDataSource:", AppDataSource);
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );
