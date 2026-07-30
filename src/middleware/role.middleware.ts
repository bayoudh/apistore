import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || !user.role) {
      return next(new AppError("User not authenticated", 401));
    }

    if (!roles.includes(user.role.name)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
