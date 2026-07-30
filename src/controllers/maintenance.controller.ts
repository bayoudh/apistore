import { Request, Response, NextFunction } from "express";
import { MaintenanceService } from "../services/maintenance.service";

const maintenanceService = new MaintenanceService();

export class MaintenanceController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, status, softwareId } = req.query;
      const records = await maintenanceService.findAll(
        Number(page) || 1,
        Number(limit) || 10,
        { status: status as string, softwareId: softwareId as string }
      );
      res.json(records);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const record = await maintenanceService.findById(req.params.id as string);
      res.json(record);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const record = await maintenanceService.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const record = await maintenanceService.update(req.params.id as string, req.body);
      res.json(record);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await maintenanceService.delete(req.params.id as string);
      res.json({ message: "Maintenance record deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
