import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

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
        "Error al enviar datos del servicio de reclutamiento"
      );
    }
  }
}
