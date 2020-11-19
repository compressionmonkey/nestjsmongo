import { Module } from '@nestjs/common';
import { DBConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [DBConfig, UserModule, ProfileModule],
})
export class AppModule {}
