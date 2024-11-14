import { IsString, IsInt, IsIn, IsDateString, Min } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surename: string;

  @IsDateString()
  birthday: string;

  @IsInt()
  @Min(1)
  age: number;

  @IsIn(["CUIT", "DNI"])
  documentType: string;

  @IsInt()
  documentNumber: number;
}
