import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDoctorAppointmentsService from '@modules/appointments/services/ListDoctorAppointmentsService';
import { classToClass } from 'class-transformer';

export default class DoctorAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const doctor_id = request.user.id;
    const { day, month, year } = request.query;

    const listDoctorAppointmentsService = container.resolve(
      ListDoctorAppointmentsService,
    );

    const appointments = await listDoctorAppointmentsService.execute({
      doctor_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}
