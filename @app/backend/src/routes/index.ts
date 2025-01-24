import { Router } from "express";
import "express-async-errors";
import patientsRouter from "./patients";
import dateRouter from "./date";

const router = Router();
router.use("/patients", patientsRouter);
router.use("/date", dateRouter);

export default router;
