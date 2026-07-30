import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { AppError } from "../utils/AppError";

export const validateDto = (dtoClass: any) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToInstance(dtoClass, req.body);
      const errors = await validate(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: false,
      });

      if (errors.length > 0) {
        const formattedErrors = errors.map((err) => ({
          field: err.property,
          messages: Object.values(err.constraints || {}),
        }));

        const error = new AppError("Validation failed", 400);
        (error as any).errors = formattedErrors;
        return next(error);
      }

      req.body = dto;
      next();
    } catch (error) {
      next(error);
    }
  };
};
