import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromDoctorDTO from '../dtos/IFindAllInMonthFromDoctorDTO';
import IFindAllInDayFromDoctorDTO from '../dtos/IFindAllInDayFromDoctorDTO';
import IFindAllInDayFromUserDTO from '../dtos/IFindAllInDayFromUserDTO';
// import IFindAllDTO from '../dtos/IFindAllDTO';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, doctor_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromDoctor(
    data: IFindAllInMonthFromDoctorDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromDoctor(
    data: IFindAllInDayFromDoctorDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromUser(data: IFindAllInDayFromUserDTO): Promise<Appointment[]>;
  // findAllOrderedAndPaginated(data: IFindAllDTO): Promise<Appointment[]>;
  findAllByUserId(id: string): Promise<Appointment[]>;
  findAllByDoctorId(id: string): Promise<Appointment[]>;
  findAllFromDoctor(id: string): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
