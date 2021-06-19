import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AppointmentStatus, AppointmentRate } from '@config/enums';
import User from '../../../../users/infra/typeorm/entities/User';
import Doctor from '../../../../users/infra/typeorm/entities/Doctor';
import AppointmentsSymptoms from '../../../../appointments/infra/typeorm/entities/AppointmentsSymptoms';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patient_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  @Column()
  doctor_id: string;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column('timestamp with time zone')
  date: Date;

  @OneToMany(() => AppointmentsSymptoms, appointment_symptoms => appointment_symptoms.appointment, {
    cascade: true,
  })
  appointment_symptoms: AppointmentsSymptoms[];

  @Column()
  description: string;

  @Column()
  result: string;

  @Column('int')
  rate: AppointmentRate;

  @Column({ type: 'int' })
  status: AppointmentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
