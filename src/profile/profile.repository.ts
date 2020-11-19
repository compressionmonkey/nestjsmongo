import { EntityRepository, Repository } from 'typeorm'
import { ProfileEntity } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash'
import { UpdateProfileDTO } from './dto/update-Profile.dto';
import { CheckIfPropertiesAreValid } from './nooblibrary'
@EntityRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity>{
    constructor(
        @InjectRepository(ProfileEntity)
        private profileRepository: Repository<ProfileEntity>
        ){
        super()
    }
    async getProfile(id: number){
        if(id){
            const query = this.profileRepository.createQueryBuilder('profile');
            return await query.where("profile.id = :id", { id: id }).getOne()
        }
        else{
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Invalid Login',
              }, HttpStatus.FORBIDDEN); 
        }
    }
    async updateProfile(id: number, data: UpdateProfileDTO){
        const dataProperties = Object.keys(data).map(key => (key))
        if(CheckIfPropertiesAreValid(dataProperties)){
            const query = this.profileRepository.createQueryBuilder('profile')
            await query.where("profile.id = :id", { id: id })
            .update(ProfileEntity)
            .set(data).execute()
            return await this.profileRepository.createQueryBuilder('secondquery')
            .where("secondquery.id = :id", { id: id }).getOne()
        }
        else{
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Invalid Parameters passed',
              }, HttpStatus.FORBIDDEN)
        }
    }
}
