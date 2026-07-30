import { Request, Response, NextFunction } from "express";
import { SoftwareService } from "../services/software.service";

const softwareService = new SoftwareService();

export class SoftwareController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const software = await softwareService.findAll();
      res.json(software);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const software = await softwareService.findById(req.params.id as string);
      res.json(software);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const software = await softwareService.create(req.body);
      res.status(201).json(software);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const software = await softwareService.update(req.params.id as string, req.body);
      res.json(software);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await softwareService.delete(req.params.id as string);
      res.json({ message: "Software deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
