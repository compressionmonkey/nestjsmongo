import { Controller, Get, Body, Headers, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RolesGuard } from 'src/roles.guard';
import { UpdateProfileDTO } from './dto/update-Profile.dto'
import * as _ from 'lodash'
import { profileVerification } from './profile.decorator'
import { CheckToken } from './nooblibrary'
@Controller('profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService
    ){}

    @Get()
    @UseGuards(new RolesGuard())
    async getProfile(@Headers() headers: any,
    // @profileVerification('as') bla: any
    ){
        // console.log('lk',bla)
        const token = headers.authorization.split(' ')[1];
        const profileAccount = await CheckToken(token)
        if(profileAccount['profileId']){
            return this.profileService.getProfile(profileAccount['profileId'])
        }
        else{
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                error: 'Please log in with a real account',
              }, HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @Put()
    @UseGuards(new RolesGuard())
    async updateProfile(@Headers() headers: any,
        @Body() data: UpdateProfileDTO
    ){
        const token = headers.authorization.split(' ')[1];
        const profileAccount = await CheckToken(token)
        if(profileAccount['profileId'] && !_.isEmpty(data)){
            return this.profileService.updateProfile(profileAccount['profileId'], data)
        }
        else{
            if(_.isEmpty(data)){
                throw new HttpException({
                    status: HttpStatus.NOT_ACCEPTABLE,
                    error: 'Please enter details to update',
                  }, HttpStatus.NOT_ACCEPTABLE)
            }
            else{
                throw new HttpException({
                    status: HttpStatus.NOT_ACCEPTABLE,
                    error: 'Please log in with a real account',
                  }, HttpStatus.NOT_ACCEPTABLE)
            }
        }
    }
}
