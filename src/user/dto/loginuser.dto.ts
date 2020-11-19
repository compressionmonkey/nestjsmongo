import { IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UserRO {
  id: number;
  username: string;
  // password: string
  token?: string;
}
