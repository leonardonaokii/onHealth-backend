import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  patient_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListDoctorAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    patient_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    if (!day || !month || !year) {
      return this.appointmentsRepository.findAllByUserId(patient_id);
    }

    const appointments = await this.appointmentsRepository.findAllInDayFromUser(
      {
        patient_id,
        day,
        month,
        year,
      },
    );

    return appointments;
  }
}

export default ListDoctorAppointmentsService;
