import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Validar y modificar el DTO en el servicio
    const validatedUserDto =
      this.usersService.validateAndFormatUser(createUserDto);

    // Enviar datos al servicio de reclutamiento
    return this.usersService.sentToRecruitmentService(validatedUserDto);
  }
}
