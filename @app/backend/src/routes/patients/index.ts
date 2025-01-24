import { createPatient } from "@app/backend/controllers/patient";
import { ApiResponseType } from "@app/backend/types/api";
import { NewPatientSchema } from "@app/backend/validation/patient";
import { Patient } from "@prisma/client";
import { Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const patientsRouter = Router();

patientsRouter.get("/", (req, res) => {
  res.send("Hello from patients");
});

patientsRouter.get("/:id", (req, res) => {
  res.send(`Hello from patient ${req.params.id}`);
});

patientsRouter.post(
  "/",
  async (req, res: Response<ApiResponseType<Patient, null>>) => {
    console.log(req.body);
    const data = NewPatientSchema.parse(req.body);

    const patient = await createPatient(data);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Patient has been registered successfully",
      data: patient,
    });
  }
);

export default patientsRouter;
