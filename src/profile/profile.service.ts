import { Injectable } from '@nestjs/common';
import { UpdateProfileDTO } from './dto/update-Profile.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
    constructor(
        private profileRepository: ProfileRepository
        ){}

    async getProfile(id: number){
        
        return await this.profileRepository.getProfile(id)
    }
    async updateProfile(id: number, data: UpdateProfileDTO){
        
        return await this.profileRepository.updateProfile(id, data)
    }
}
