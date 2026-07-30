import { AuditLogRepository } from "../repositories/audit-log.repository";
import { UserRepository } from "../repositories/user.repository";

export class AuditLogService {
  private auditLogRepo: AuditLogRepository;
  private userRepo: UserRepository;

  constructor() {
    this.auditLogRepo = new AuditLogRepository();
    this.userRepo = new UserRepository();
  }

  async log(data: {
    action: string;
    entity: string;
    entityId?: string;
    oldValue?: Record<string, unknown>;
    newValue?: Record<string, unknown>;
    ipAddress?: string;
    userId?: string;
  }) {
    const auditLog = this.auditLogRepo.create(data);
    return this.auditLogRepo.save(auditLog);
  }

  async findAll(page = 1, limit = 20, filters?: { entity?: string; action?: string; userId?: string }) {
    const qb = this.auditLogRepo.createQueryBuilder("log");

    if (filters?.entity) {
      qb.andWhere("log.entity = :entity", { entity: filters.entity });
    }
    if (filters?.action) {
      qb.andWhere("log.action = :action", { action: filters.action });
    }
    if (filters?.userId) {
      qb.andWhere("log.userId = :userId", { userId: filters.userId });
    }

    const total = await qb.getCount();
    const logs = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy("log.createdAt", "DESC")
      .getMany();

    return {
      logs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const log = await this.auditLogRepo.findOne({ where: { id } });
    return log;
  }
}
