import { createPatient, getPatient } from "@app/backend/controllers/patient";
import { ApiResponseType } from "@app/backend/types/api";
import { NewPatientSchema } from "@app/backend/validation/patient";
import { Patient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";

const patientsRouter = Router();

patientsRouter.get(
  "/:id",
  async (
    req: Request<{ id: number }>,
    res: Response<ApiResponseType<Patient>>
  ) => {
    const { id } = z
      .object({
        id: z.coerce.number(),
      })
      .parse(req.params);

    const patient = await getPatient(id);

    if (!patient) {
      const zodIssues =
        z.object({ id: z.string() }).safeParse(req.params).error?.issues ?? [];
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Patient not found",
        error: zodIssues,
      });

      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully retrieved patient",
      data: patient,
    });

    return;
  }
);

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
