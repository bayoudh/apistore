import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInitialSchema1700000000000 implements MigrationInterface {
  name = "CreateInitialSchema1700000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "name", type: "varchar", length: "50", isUnique: true },
          { name: "description", type: "varchar", length: "200" },
          { name: "permissions", type: "simple-json" },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "firstName", type: "varchar", length: "100" },
          { name: "lastName", type: "varchar", length: "100" },
          { name: "email", type: "varchar", length: "150", isUnique: true },
          { name: "password", type: "varchar" },
          { name: "status", type: "varchar", length: "20", default: "'active'" },
          { name: "lastLoginAt", type: "datetime", isNullable: true },
          { name: "roleId", type: "varchar" },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
          { name: "updatedAt", type: "datetime", default: "datetime('now')" },
        ],
        foreignKeys: [
          { columnNames: ["roleId"], referencedTableName: "roles", referencedColumnNames: ["id"] },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "token", type: "varchar" },
          { name: "expiresAt", type: "datetime" },
          { name: "isRevoked", type: "boolean", default: false },
          { name: "userId", type: "varchar" },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
        ],
        foreignKeys: [
          { columnNames: ["userId"], referencedTableName: "users", referencedColumnNames: ["id"], onDelete: "CASCADE" },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "clients",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "companyName", type: "varchar", length: "150" },
          { name: "contactFirstName", type: "varchar", length: "100" },
          { name: "contactLastName", type: "varchar", length: "100" },
          { name: "email", type: "varchar", length: "150", isUnique: true },
          { name: "phone", type: "varchar", length: "20", isNullable: true },
          { name: "address", type: "varchar", isNullable: true },
          { name: "city", type: "varchar", length: "100", isNullable: true },
          { name: "country", type: "varchar", length: "100", isNullable: true },
          { name: "status", type: "varchar", length: "20", default: "'active'" },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
          { name: "updatedAt", type: "datetime", default: "datetime('now')" },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "software",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "name", type: "varchar", length: "150" },
          { name: "version", type: "varchar", length: "50" },
          { name: "vendor", type: "varchar", length: "100", isNullable: true },
          { name: "status", type: "varchar", length: "50", default: "'active'" },
          { name: "description", type: "text", isNullable: true },
          { name: "licenseType", type: "varchar", length: "50", isNullable: true },
          { name: "licenseExpiry", type: "datetime", isNullable: true },
          { name: "clientId", type: "varchar" },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
          { name: "updatedAt", type: "datetime", default: "datetime('now')" },
        ],
        foreignKeys: [
          { columnNames: ["clientId"], referencedTableName: "clients", referencedColumnNames: ["id"] },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "tickets",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "ticketNumber", type: "varchar", length: "20", isUnique: true },
          { name: "subject", type: "varchar", length: "200" },
          { name: "description", type: "text" },
          { name: "status", type: "varchar", length: "20", default: "'open'" },
          { name: "priority", type: "varchar", length: "20", default: "'medium'" },
          { name: "category", type: "varchar", length: "50", default: "'bug'" },
          { name: "resolvedAt", type: "datetime", isNullable: true },
          { name: "clientId", type: "varchar" },
          { name: "softwareId", type: "varchar" },
          { name: "assignedTechnicianId", type: "varchar", isNullable: true },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
          { name: "updatedAt", type: "datetime", default: "datetime('now')" },
        ],
        foreignKeys: [
          { columnNames: ["clientId"], referencedTableName: "clients", referencedColumnNames: ["id"] },
          { columnNames: ["softwareId"], referencedTableName: "software", referencedColumnNames: ["id"] },
          { columnNames: ["assignedTechnicianId"], referencedTableName: "users", referencedColumnNames: ["id"] },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "maintenance",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "title", type: "varchar", length: "150" },
          { name: "description", type: "text" },
          { name: "type", type: "varchar", length: "50" },
          { name: "status", type: "varchar", length: "20", default: "'scheduled'" },
          { name: "scheduledAt", type: "datetime", isNullable: true },
          { name: "completedAt", type: "datetime", isNullable: true },
          { name: "notes", type: "text", isNullable: true },
          { name: "softwareId", type: "varchar" },
          { name: "technicianId", type: "varchar", isNullable: true },
          { name: "ticketId", type: "varchar", isNullable: true },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
          { name: "updatedAt", type: "datetime", default: "datetime('now')" },
        ],
        foreignKeys: [
          { columnNames: ["softwareId"], referencedTableName: "software", referencedColumnNames: ["id"] },
          { columnNames: ["technicianId"], referencedTableName: "users", referencedColumnNames: ["id"] },
          { columnNames: ["ticketId"], referencedTableName: "tickets", referencedColumnNames: ["id"] },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "comments",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "content", type: "text" },
          { name: "ticketId", type: "varchar" },
          { name: "authorId", type: "varchar" },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
        ],
        foreignKeys: [
          { columnNames: ["ticketId"], referencedTableName: "tickets", referencedColumnNames: ["id"], onDelete: "CASCADE" },
          { columnNames: ["authorId"], referencedTableName: "users", referencedColumnNames: ["id"] },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "attachments",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "fileName", type: "varchar", length: "255" },
          { name: "originalName", type: "varchar", length: "255" },
          { name: "mimeType", type: "varchar", length: "100" },
          { name: "fileSize", type: "int" },
          { name: "filePath", type: "varchar" },
          { name: "ticketId", type: "varchar" },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
        ],
        foreignKeys: [
          { columnNames: ["ticketId"], referencedTableName: "tickets", referencedColumnNames: ["id"], onDelete: "CASCADE" },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "contracts",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "contractNumber", type: "varchar", length: "20", isUnique: true },
          { name: "title", type: "varchar", length: "150" },
          { name: "description", type: "text", isNullable: true },
          { name: "status", type: "varchar", length: "50", default: "'active'" },
          { name: "type", type: "varchar", length: "50" },
          { name: "startDate", type: "datetime" },
          { name: "endDate", type: "datetime" },
          { name: "value", type: "decimal", precision: 10, scale: 2, isNullable: true },
          { name: "terms", type: "text", isNullable: true },
          { name: "clientId", type: "varchar" },
          { name: "softwareId", type: "varchar", isNullable: true },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
          { name: "updatedAt", type: "datetime", default: "datetime('now')" },
        ],
        foreignKeys: [
          { columnNames: ["clientId"], referencedTableName: "clients", referencedColumnNames: ["id"] },
          { columnNames: ["softwareId"], referencedTableName: "software", referencedColumnNames: ["id"] },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "audit_logs",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, generationStrategy: "uuid" },
          { name: "action", type: "varchar", length: "50" },
          { name: "entity", type: "varchar", length: "100" },
          { name: "entityId", type: "varchar", isNullable: true },
          { name: "oldValue", type: "simple-json", isNullable: true },
          { name: "newValue", type: "simple-json", isNullable: true },
          { name: "ipAddress", type: "text", isNullable: true },
          { name: "userId", type: "varchar", isNullable: true },
          { name: "createdAt", type: "datetime", default: "datetime('now')" },
        ],
        foreignKeys: [
          { columnNames: ["userId"], referencedTableName: "users", referencedColumnNames: ["id"] },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("audit_logs");
    await queryRunner.dropTable("contracts");
    await queryRunner.dropTable("attachments");
    await queryRunner.dropTable("comments");
    await queryRunner.dropTable("maintenance");
    await queryRunner.dropTable("tickets");
    await queryRunner.dropTable("software");
    await queryRunner.dropTable("clients");
    await queryRunner.dropTable("refresh_tokens");
    await queryRunner.dropTable("users");
    await queryRunner.dropTable("roles");
  }
}
