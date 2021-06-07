import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  doctor_id: string;
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
    doctor_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    if (!day || !month || !year) {
      return this.appointmentsRepository.findAllByDoctorId(doctor_id);
    }

    const appointments = await this.appointmentsRepository.findAllInDayFromDoctor(
      {
        doctor_id,
        day,
        month,
        year,
      },
    );

    return appointments;
  }
}

export default ListDoctorAppointmentsService;
