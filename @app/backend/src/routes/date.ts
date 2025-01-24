import { Response, Router } from "express";
import { ApiResponseType } from "../types/api";

const dateRouter = Router();

dateRouter.get(
  "/",
  (_, res: Response<ApiResponseType<{ current_date: string }>>) => {
    const readableDateInKenya = new Date().toLocaleString("en-KE", {
      timeZone: "Africa/Nairobi",
    });
    res.json({
      success: true,
      message: "Current date is " + readableDateInKenya,
      data: {
        current_date: new Date().toISOString(),
      },
    });
  }
);

export default dateRouter;
