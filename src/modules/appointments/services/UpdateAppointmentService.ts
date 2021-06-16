import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  id: string;
  description: string;
  result: string;
}

@injectable()
class UpdateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    id,
    description,
    result,
  }: IRequest): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw new AppError('Appointment not found');
    }

    appointment.description = description;
    appointment.result = result;
    appointment.status = 1;

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default UpdateAppointmentService;
