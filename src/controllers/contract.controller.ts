import { Request, Response, NextFunction } from "express";
import { ContractService } from "../services/contract.service";

const contractService = new ContractService();

export class ContractController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, status, clientId } = req.query;
      const contracts = await contractService.findAll(
        Number(page) || 1,
        Number(limit) || 10,
        { status: status as string, clientId: clientId as string }
      );
      res.json(contracts);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const contract = await contractService.findById(req.params.id as string);
      res.json(contract);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const contract = await contractService.create(req.body);
      res.status(201).json(contract);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const contract = await contractService.update(req.params.id as string, req.body);
      res.json(contract);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await contractService.delete(req.params.id as string);
      res.json({ message: "Contract deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
