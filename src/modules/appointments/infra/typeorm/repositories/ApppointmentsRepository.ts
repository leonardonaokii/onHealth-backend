import { getRepository, Raw, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IFindAllInMonthFromDoctorDTO from '@modules/appointments/dtos/IFindAllInMonthFromDoctorDTO';
import IFindAllInDayFromDoctorDTO from '@modules/appointments/dtos/IFindAllInDayFromDoctorDTO';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllDTO from '@modules/appointments/dtos/IFindAllDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(
    date: Date,
    doctor_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, doctor_id },
    });

    return findAppointment;
  }

  public async findAllInMonthFromDoctor({
    doctor_id,
    month,
    year,
  }: IFindAllInMonthFromDoctorDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        doctor_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });
    return appointments;
  }

  public async findAllInDayFromDoctor({
    doctor_id,
    day,
    month,
    year,
  }: IFindAllInDayFromDoctorDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        doctor_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });
    return appointments;
  }

  public async create({
    patient_id,
    doctor_id,
    date,
    symptoms,
    description,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      patient_id,
      doctor_id,
      date,
      symptoms,
      description,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAll({
    user_id,
    order = 'ASC',
    page = 1,
    perPage = 9,
  }: IFindAllDTO): Promise<Appointments> {
    // check user type
    // call fn
  }
}

export default AppointmentsRepository;
