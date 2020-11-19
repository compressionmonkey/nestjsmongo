import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('profile')
export class ProfileEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: NumberConstructor

    @Column({ nullable: true })
    profile_picture: string

    @Column({ nullable: true })
    fullname: string

    @Column({ nullable: true })
    phonenumber: string

    @Column({ nullable: true })
    city: string
    
}