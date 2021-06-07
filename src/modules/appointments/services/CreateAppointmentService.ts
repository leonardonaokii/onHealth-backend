import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { isBefore, startOfHour } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    date,
    doctor_id,
    patient_id,
    symptoms,
    description,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (patient_id === doctor_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      doctor_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      date,
      doctor_id,
      patient_id,
      symptoms,
      description,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
