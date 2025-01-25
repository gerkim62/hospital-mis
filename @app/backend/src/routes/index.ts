import { Router } from "express";
import "express-async-errors";
import patientsRouter from "./patients";
import dateRouter from "./date";
import stockRouter from "./stock";

const router = Router();
router.use("/patients", patientsRouter);
router.use("/date", dateRouter);
router.use("/stock", stockRouter);

export default router;
