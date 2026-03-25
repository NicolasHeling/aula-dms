import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsUUID()
  teacherId?: string;

  @IsArray()
  @IsString({ each: true })
  permissions!: string[];
}
