import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  // Validar y formatear los datos del usuario
  validateAndFormatUser(createUserDto: CreateUserDto): CreateUserDto {
    const modifiedUserDto = { ...createUserDto };

    // Validar y capitalizar nombre
    if (!createUserDto.name) {
      throw new BadRequestException("El nombre es obligatorio.");
    }
    modifiedUserDto.name = this.capitalize(createUserDto.name);

    // Validar y capitalizar apellido
    if (!createUserDto.surename) {
      throw new BadRequestException("El apellido es obligatorio.");
    }
    modifiedUserDto.surename = this.capitalize(createUserDto.surename);

    // Validar fecha de nacimiento
    const birthday = new Date(createUserDto.birthday);
    const earliestDate = new Date("1900-01-01");
    const today = new Date();

    if (birthday < earliestDate || birthday > today) {
      throw new BadRequestException(
        "La fecha de nacimiento debe estar entre 1900/01/01 y hoy.",
      );
    }

    return modifiedUserDto;
  }

  // Método para capitalizar la primera letra de cada palabra
  private capitalize(value: string): string {
    if (typeof value !== "string") {
      throw new BadRequestException("El valor debe ser una cadena.");
    }
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Enviar datos al servicio de reclutamiento
  async sentToRecruitmentService(createUserDto: CreateUserDto) {
    const url =
      "https://reclutamiento-dev-procontacto-default-rtdb.firebaseio.com/reclutier.json";
    try {
      const response = await this.httpService
        .post(url, createUserDto)
        .toPromise();
      return response.data;
    } catch {
      throw new InternalServerErrorException(
        "Error al enviar datos del servicio de reclutamiento",
      );
    }
  }
}
