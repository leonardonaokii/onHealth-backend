import MedicalSpecialty from '@modules/medicalSpecialty/infra/typeorm/entities/MedicalSpecialty';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('doctors')
class Doctor {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  crm: string;

  @Column('int')
  medical_specialty: number;

  @ManyToOne(() => MedicalSpecialty)
  @JoinColumn({ name: 'medical_specialty' })
  medspec: MedicalSpecialty;

  @OneToOne(() => User)
  user: User;

  @Column()
  rating: number;

  @Column()
  appointments_total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Doctor;
