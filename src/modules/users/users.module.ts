import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../shared/infra/database/database.module";
import { UserService } from "./application/services/user.service";
import { USER_REPOSITORY } from "./domain/repositories/user-repository.interface";
import { UsersController } from "./infra/controllers/users.controller";
import { DrizzleUserRepository } from "./infra/repositories/drizzle-user.repository";

@Module({
  imports: [DatabaseModule], // Importa a conexão com o banco
  controllers: [UsersController], // Registra nossa rota de cadastro
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: DrizzleUserRepository, // Aqui ativamos o banco de verdade!
    },
  ],
  exports: [UserService],
})
export class UsersModule {}
