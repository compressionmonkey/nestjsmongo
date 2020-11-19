import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDTO } from './dto/loginuser.dto';
import { CreateProfileDTO } from 'src/profile/dto/create-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
  }

  register(createProfileDTO: CreateProfileDTO) {
    return this.userRepository.register(createProfileDTO);
  }

  login(data: LoginUserDTO) {
    return this.userRepository.login(data);
  }
}
