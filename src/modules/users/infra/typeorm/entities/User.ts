import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Gender, UserType } from '@config/enums';
import uploadConfig from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column()
  cpf: string;

  @Column()
  birth_date: Date;

  @Column('int')
  gender: Gender;

  @Column()
  phone: string;

  @Column()
  country: string;

  @Column()
  administrative_area: string;

  @Column()
  locality: string;

  @Column()
  thoroughfare: string;

  @Column()
  zipcode: string;

  @Column('int')
  type: UserType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
