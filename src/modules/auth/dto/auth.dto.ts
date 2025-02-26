/** @format */

import { ApiProperty } from '@nestjs/swagger';
import { ValidateIf } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

}

export class RegisterRequestDto extends LoginRequestDto {
  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  name: string;

  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  avatar: string;

  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  phone: string;
}

export class ValidateRequestDto {
  @ApiProperty()
  token: string;
}
