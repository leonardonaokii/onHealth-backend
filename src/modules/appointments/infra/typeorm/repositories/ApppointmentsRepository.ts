import { getRepository, Raw, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IFindAllInMonthFromDoctorDTO from '@modules/appointments/dtos/IFindAllInMonthFromDoctorDTO';
import IFindAllInDayFromDoctorDTO from '@modules/appointments/dtos/IFindAllInDayFromDoctorDTO';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromUserDTO from '@modules/appointments/dtos/IFindAllInDayFromUserDTO';
// import IFindAllDTO from '@modules/appointments/dtos/IFindAllDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(
    date: Date,
    doctor_id: string,
  ): Promise<Appointment | undefined> {
    console.log(date);

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
      relations: ['doctor', 'patient'],
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
            `TO_CHAR(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['doctor', 'patient'],
    });
    return appointments;
  }

  public async findAllInDayFromUser({
    patient_id,
    day,
    month,
    year,
  }: IFindAllInDayFromUserDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        patient_id,
        date: Raw(
          dateFieldName =>
            `TO_CHAR(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['doctor', 'patient'],
    });
    return appointments;
  }

  public async findAllFromDoctor(doctor_id: string): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        doctor_id,
      },
      relations: ['doctor', 'patient'],
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

  public async findAllByUserId(id: string): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        patient_id: id,
      },
      relations: ['patient', 'doctor'],
    });

    return appointments;
  }

  public async findAllByDoctorId(id: string): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        doctor_id: id,
      },
      relations: ['patient', 'doctor'],
    });

    return appointments;
  }
}

export default AppointmentsRepository;
