import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "@shared/infra/decorators/public.decorator";
import { LoginDto } from "../../application/dto/login.dto";
import { AuthService } from "../../application/services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @Public()
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
