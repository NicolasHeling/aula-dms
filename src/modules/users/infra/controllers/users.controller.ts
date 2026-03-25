import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "../../../../shared/infra/decorators/public.decorator";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { UserService } from "../../application/services/user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public() // Deixamos pública temporariamente para você criar o primeiro Admin
  async create(@Body() dto: CreateUserDto) {
    await this.userService.create(dto);
    return { message: "Usuário criado com sucesso!" };
  }
}
