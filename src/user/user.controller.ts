import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDTO } from './dto/loginuser.dto';
import { CreateProfileDTO } from 'src/profile/dto/create-profile.dto';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  createUser(
    @Body() createProfileDTO: CreateProfileDTO
  ) {
    return this.userService.register(createProfileDTO);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: LoginUserDTO) {
    return this.userService.login(data);
  }
}
