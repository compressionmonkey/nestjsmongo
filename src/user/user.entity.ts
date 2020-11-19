import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, BeforeInsert, JoinColumn } from 'typeorm';
import { ProfileEntity } from 'src/profile/profile.entity';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  password: string;

  @Column({
    unique: true,
  })
  confirm_password: string;

  @OneToOne(type => ProfileEntity)
  @JoinColumn()
    // @Column()
    // profile: Promise<ProfileEntity>
  profile: Promise<ProfileEntity>;

  @Column({ type: 'int', nullable: true })
  profileId?: number | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirm_password = await bcrypt.hash(this.confirm_password, 10);
  }

  // toResponseObject(showToken: boolean = true){
  //     const { id, username, token, profile } = this
  //     const responseObject: any = { id, username, profile}
  //     if(showToken){
  //         responseObject.token = token
  //     }
  //     return responseObject
  // }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  // private get token() {
  //   const { id, username } = this
  //   return jwt.sign({
  //     id, username,
  //   }, process.env.SECRET, { expiresIn: 60 * 30 });
  // }
}
