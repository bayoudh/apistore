import { Request, Response, NextFunction } from "express";
import { ClientService } from "../services/client.service";

const clientService = new ClientService();

export class ClientController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await clientService.findAll();
      res.json(clients);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientService.findById(req.params.id as string);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientService.create(req.body);
      res.status(201).json(client);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientService.update(req.params.id as string, req.body);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await clientService.delete(req.params.id as string);
      res.json({ message: "Client deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
