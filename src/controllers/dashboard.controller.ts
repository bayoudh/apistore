import { Request, Response, NextFunction } from "express";
import { DashboardService } from "../services/dashboard.service";

const dashboardService = new DashboardService();

export class DashboardController {
  static async getStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await dashboardService.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}
