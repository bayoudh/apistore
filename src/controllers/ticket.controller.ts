import { Request, Response, NextFunction } from "express";
import { TicketService } from "../services/ticket.service";
import { CommentService } from "../services/comment.service";

const ticketService = new TicketService();
const commentService = new CommentService();

export class TicketController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, status, priority, clientId } = req.query;
      const tickets = await ticketService.findAll(
        Number(page) || 1,
        Number(limit) || 10,
        { status: status as string, priority: priority as string, clientId: clientId as string }
      );
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.findById(req.params.id as string);
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.create(req.body);
      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.update(req.params.id as string, req.body);
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ticketService.delete(req.params.id as string);
      res.json({ message: "Ticket deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async assignTechnician(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.assignTechnician(
        req.params.id as string,
        req.body.technicianId
      );
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }

  static async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const comment = await commentService.create({
        content: req.body.content,
        ticketId: req.params.id as string,
        authorId: user.id,
      });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }

  static async getStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await ticketService.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}
