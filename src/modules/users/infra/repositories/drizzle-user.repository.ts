import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DrizzleService } from "../../../../shared/infra/database/drizzle.service";
import { User } from "../../domain/models/user.entity";
import { UserRepository } from "../../domain/repositories/user-repository.interface";
import { usersSchema } from "../schemas/user.schema";

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(user: User): Promise<void> {
    await this.drizzle.db.insert(usersSchema).values({
      id: user.id,
      email: user.email,
      password: user.password,
      teacherId: user.teacherId,
      permissions: user.permissions,
    });
  }

  async update(user: User): Promise<void> {
    await this.drizzle.db
      .update(usersSchema)
      .set({
        email: user.email,
        password: user.password,
        teacherId: user.teacherId,
        permissions: user.permissions,
        updatedAt: new Date(),
      })
      .where(eq(usersSchema.id, user.id!));
  }

  async delete(id: string): Promise<void> {
    await this.drizzle.db.delete(usersSchema).where(eq(usersSchema.id, id));
  }

  async findAll(): Promise<User[]> {
    const rows = await this.drizzle.db.select().from(usersSchema);
    return rows.map((row) => User.restore(row)!);
  }

  async findById(id: string): Promise<User | null> {
    const [row] = await this.drizzle.db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.id, id));
    return row ? User.restore(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [row] = await this.drizzle.db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email));
    return row ? User.restore(row) : null;
  }
}
