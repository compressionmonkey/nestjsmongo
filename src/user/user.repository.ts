import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDTO, UserRO } from './dto/loginuser.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProfileEntity } from 'src/profile/profile.entity';
import { CreateProfileDTO } from 'src/profile/dto/create-profile.dto';
import { ProfileRepository } from 'src/profile/profile.repository';
import * as jwt from 'jsonwebtoken';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,
  ) {
    super();
  }

  async register(createProfileDTO: CreateProfileDTO) {
    const { username, email, confirm_password, password, fullname, phonenumber, city } = createProfileDTO;
    let user = await this.findOne({ where: { username } });
    let duplicateEmail = await this.findOne({ where: { email } });
    if (user && duplicateEmail) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'User/email already exists',
      }, HttpStatus.FORBIDDEN);
    } else {
      const profile = new ProfileEntity();
      profile.fullname = fullname;
      profile.phonenumber = phonenumber;
      profile.city = city;
      // profile.username = username;
      await profile.save();

      const newuser = new User;
      newuser.username = username;
      newuser.email = email;
      newuser.password = password;
      newuser.confirm_password = confirm_password;
      newuser.profile = Promise.resolve(profile);

      newuser.save();
      const token = jwt.sign({
        profileId: profile.id, username,
      }, process.env.SECRET, { expiresIn: 60 * 30 });
      // return newuser.toResponseObject();
      return { ...newuser, token: token };
    }
  }

  async login(data: LoginUserDTO) {
    const { username, password } = data;
    // const query = this.createQueryBuilder('user');
    // return await query.getMany()
    this.profileRepo = this.manager.getCustomRepository(ProfileRepository);
    const userSelected = await this.findOne({ where: { username: username } });
    if(userSelected){
      const profile = await this.profileRepo.findOne({ where: { id: userSelected.profileId } });
      if (!(await userSelected && await userSelected.comparePassword(password))) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid UserName/ Password',
        }, HttpStatus.FORBIDDEN);
      }
      const token = jwt.sign({
        profileId: profile.id, username,
      }, process.env.SECRET, { expiresIn: 60 * 30 })
      return { ...profile, token: token }
    }
    else{
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid UserName/ Password',
      }, HttpStatus.FORBIDDEN);
    }
  }
}
