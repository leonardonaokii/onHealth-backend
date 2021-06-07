import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserAppointmentsService from '@modules/appointments/services/ListUserAppointmentsService';

export default class UserAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { day, month, year } = request.query;

    const listUserAppointmentsService = container.resolve(
      ListUserAppointmentsService,
    );

    const appointments = await listUserAppointmentsService.execute({
      patient_id: id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(appointments);
  }
}
