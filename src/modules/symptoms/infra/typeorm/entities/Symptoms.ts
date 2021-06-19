import AppointmentsSymptoms from '@modules/appointments/infra/typeorm/entities/AppointmentsSymptoms';
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('symptoms')
class Symptoms {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AppointmentsSymptoms, appointment_symptoms => appointment_symptoms.symptom)
  appointment_symptoms: AppointmentsSymptoms[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Symptoms;
