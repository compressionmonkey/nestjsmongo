import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ProfileEntity } from 'src/profile/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProfileEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
