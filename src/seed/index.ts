import { AppDataSource } from "../config/datasource";
import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { Client } from "../entities/Client";
import { Software } from "../entities/Software";
import { Contract } from "../entities/Contract";
import { Ticket } from "../entities/Ticket";
import { Maintenance } from "../entities/Maintenance";
import bcrypt from "bcrypt";

async function seed() {
  await AppDataSource.initialize();
  console.log("Database connected. Seeding...");

  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);
  const clientRepo = AppDataSource.getRepository(Client);
  const softwareRepo = AppDataSource.getRepository(Software);
  const contractRepo = AppDataSource.getRepository(Contract);
  const ticketRepo = AppDataSource.getRepository(Ticket);
  const maintenanceRepo = AppDataSource.getRepository(Maintenance);

  // Roles
  const adminRole = roleRepo.create({ name: "admin", description: "System administrator", permissions: ["*"] });
  const managerRole = roleRepo.create({ name: "manager", description: "Support manager", permissions: ["tickets.*", "clients.*", "software.*", "reports.*"] });
  const technicianRole = roleRepo.create({ name: "technician", description: "Support technician", permissions: ["tickets.read", "tickets.update", "maintenance.*"] });
  const clientRole = roleRepo.create({ name: "client", description: "Client user", permissions: ["tickets.create", "tickets.read"] });
  await roleRepo.save([adminRole, managerRole, technicianRole, clientRole]);
  console.log("Roles created");

  // Users
  const hashPassword = async (pw: string) => bcrypt.hash(pw, 10);
  const users = await userRepo.save([
    userRepo.create({ firstName: "Admin", lastName: "User", email: "admin@example.com", password: await hashPassword("Admin123!"), roleId: adminRole.id }),
    userRepo.create({ firstName: "John", lastName: "Manager", email: "manager@example.com", password: await hashPassword("Manager123!"), roleId: managerRole.id }),
    userRepo.create({ firstName: "Jane", lastName: "Tech", email: "tech@example.com", password: await hashPassword("Tech123!"), roleId: technicianRole.id }),
    userRepo.create({ firstName: "Bob", lastName: "Client", email: "client@example.com", password: await hashPassword("Client123!"), roleId: clientRole.id }),
  ]);
  console.log("Users created");

  // Clients
  const clients = await clientRepo.save([
    clientRepo.create({ companyName: "Acme Corp", contactFirstName: "Alice", contactLastName: "Smith", email: "alice@acme.com", phone: "+1234567890", city: "New York", country: "USA" }),
    clientRepo.create({ companyName: "TechStart Inc", contactFirstName: "Tom", contactLastName: "Brown", email: "tom@techstart.com", phone: "+0987654321", city: "San Francisco", country: "USA" }),
    clientRepo.create({ companyName: "Global Solutions", contactFirstName: "Sara", contactLastName: "Lee", email: "sara@global.com", city: "London", country: "UK" }),
  ]);
  console.log("Clients created");

  // Software
  const softwares = await softwareRepo.save([
    softwareRepo.create({ name: "ERP Platform", version: "3.2.1", vendor: "SAP", licenseType: "enterprise", clientId: clients[0].id, description: "Enterprise resource planning system" }),
    softwareRepo.create({ name: "CRM Suite", version: "2.0.0", vendor: "Salesforce", licenseType: "subscription", clientId: clients[1].id, description: "Customer relationship management" }),
    softwareRepo.create({ name: "Analytics Dashboard", version: "1.5.0", vendor: "Tableau", licenseType: "per-seat", clientId: clients[2].id, description: "Business analytics platform" }),
  ]);
  console.log("Software created");

  // Contracts
  await contractRepo.save([
    contractRepo.create({ contractNumber: "CTR-00001", title: "ERP Annual Support", type: "support", startDate: new Date("2026-01-01"), endDate: new Date("2026-12-31"), value: 50000, clientId: clients[0].id, softwareId: softwares[0].id }),
    contractRepo.create({ contractNumber: "CTR-00002", title: "CRM Maintenance", type: "maintenance", startDate: new Date("2026-03-01"), endDate: new Date("2027-02-28"), value: 30000, clientId: clients[1].id, softwareId: softwares[1].id }),
  ]);
  console.log("Contracts created");

  // Tickets
  const tickets = await ticketRepo.save([
    ticketRepo.create({ ticketNumber: "TK-00001", subject: "Login issue", description: "Users cannot login to ERP", status: "open", priority: "high", category: "bug", clientId: clients[0].id, softwareId: softwares[0].id }),
    ticketRepo.create({ ticketNumber: "TK-00002", subject: "Data sync error", description: "CRM data not syncing", status: "in-progress", priority: "medium", category: "bug", clientId: clients[1].id, softwareId: softwares[1].id, assignedTechnicianId: users[2].id }),
    ticketRepo.create({ ticketNumber: "TK-00003", subject: "Report generation slow", description: "Analytics dashboard reports take too long", status: "open", priority: "low", category: "performance", clientId: clients[2].id, softwareId: softwares[2].id }),
  ]);
  console.log("Tickets created");

  // Maintenance
  await maintenanceRepo.save([
    maintenanceRepo.create({ title: "ERP Security Patch", description: "Apply critical security patch v3.2.2", type: "security", status: "scheduled", scheduledAt: new Date("2026-08-15"), softwareId: softwares[0].id, technicianId: users[2].id, ticketId: tickets[0].id }),
    maintenanceRepo.create({ title: "CRM Database Optimization", description: "Optimize database queries for performance", type: "performance", status: "in-progress", softwareId: softwares[1].id, technicianId: users[2].id }),
  ]);
  console.log("Maintenance records created");

  console.log("Seeding completed!");
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
