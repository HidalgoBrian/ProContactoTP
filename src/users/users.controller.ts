import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const modifiedUserDto = { ...createUserDto };

    // Validación de nombre y apellido antes de capitalizar
    if (createUserDto.name) {
      modifiedUserDto.name = this.capitalize(createUserDto.name);
    } else {
      throw new BadRequestException("El nombre es obligatorio.");
    }

    if (createUserDto.surename) {
      modifiedUserDto.surename = this.capitalize(createUserDto.surename);
    } else {
      throw new BadRequestException("El apellido es obligatorio.");
    }

    // Validación de la fecha de nacimiento
    const birthday = new Date(createUserDto.birthday);
    const earliestDate = new Date("1900-01-01");
    const today = new Date();

    if (birthday < earliestDate || birthday > today) {
      throw new BadRequestException(
        "La fecha de nacimiento debe estar entre 1900/01/01 y hoy.",
      );
    }

    return this.usersService.sentToRecruitmentService(modifiedUserDto);
  }

  // Método para capitalizar la primera letra de cada palabra
  private capitalize(value: string): string {
    if (typeof value !== "string") {
      throw new BadRequestException("El valor debe ser una cadena.");
    }
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
