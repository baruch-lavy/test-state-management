import cors from "cors";
import express from "express";

import { dataSetRoutes } from "./api/dataSet/dataSet.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dataSet", dataSetRoutes);

const port = process.env.PORT || 3033;

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
