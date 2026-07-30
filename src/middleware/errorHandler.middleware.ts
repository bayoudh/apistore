import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    const response: any = {
      success: false,
      message: err.message,
    };

    if ((err as any).errors) {
      response.errors = (err as any).errors;
    }

    res.status(err.statusCode).json(response);
    return;
  }

  if (Array.isArray((err as any).errors)) {
    const formattedErrors = (err as any).errors.map((e: any) => ({
      field: e.property,
      messages: Object.values(e.constraints || {}),
    }));

    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
    return;
  }

  console.error("Unexpected error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
