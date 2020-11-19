import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, User])],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository]
})
export class ProfileModule {}
