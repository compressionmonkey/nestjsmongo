import { IsNotEmpty } from "class-validator";

export class CreateProfileDTO {
    profile_picture?: string
    // user_id: number
    @IsNotEmpty()
    fullname: string

    @IsNotEmpty()
    phonenumber: string

    @IsNotEmpty()
    city: string
    
    summary?: string
    linkedin_url?: string
    github_url?: string

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirm_password: string;

}