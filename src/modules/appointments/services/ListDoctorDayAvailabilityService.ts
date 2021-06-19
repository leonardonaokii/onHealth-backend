import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  patient_id: string;
  doctor_id: string;
  year: number;
  month: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListDoctorDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    patient_id,
    doctor_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const userAppointments = await this.appointmentsRepository.findAllInDayFromUser(
      {
        patient_id,
        month,
        year,
        day,
      },
    );

    const doctorAppointments = await this.appointmentsRepository.findAllInDayFromDoctor(
      {
        doctor_id,
        month,
        year,
        day,
      },
    );

    const startHour = 9;

    const eachHourArray = Array.from({ length: 9 }, (_, index) => index + startHour);

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const userHasAppointmentInHour = userAppointments.find(
        appointment => getHours(appointment.date) === hour,
      );
      const doctorHasAppointmentInHour = doctorAppointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const hasAppointmentInHour =
        userHasAppointmentInHour || doctorHasAppointmentInHour;

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListDoctorDayAvailabilityService;
