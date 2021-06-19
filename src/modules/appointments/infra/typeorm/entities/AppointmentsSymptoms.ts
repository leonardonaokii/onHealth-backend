import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Symptom from '@modules/symptoms/infra/typeorm/entities/Symptoms';

@Entity('appointments_symptoms')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Appointment, appointment => appointment.appointment_symptoms)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @ManyToOne(() => Symptom, symptom => symptom.appointment_symptoms)
  @JoinColumn({ name: 'symptom_id' })
  symptom: Symptom;

  @Column()
  appointment_id: string;

  @Column()
  symptom_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;