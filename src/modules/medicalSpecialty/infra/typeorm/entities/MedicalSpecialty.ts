import Doctor from '@modules/users/infra/typeorm/entities/Doctor';
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('medical_specialty')
class MedicalSpecialty {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Doctor, doctor => doctor.medspec)
  doctor: Doctor;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MedicalSpecialty;
