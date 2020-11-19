import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('profile')
export class ProfileEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    // @Column()
    // username: string

    @Column({ nullable: true })
    profile_picture: string

    @Column({ nullable: true })
    fullname: string

    @Column({ nullable: true })
    phonenumber: string

    @Column({ nullable: true })
    city: string

    @Column({ nullable: true })
    summary: string

    @Column({ nullable: true })
    linkedin_url: string

    @Column({ nullable: true})
    github_url: string
    
}