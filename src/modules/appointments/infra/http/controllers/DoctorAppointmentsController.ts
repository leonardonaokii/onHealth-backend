import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDoctorAppointmentsService from '@modules/appointments/services/ListDoctorAppointmentsService';
import Teste from '@modules/appointments/services/Teste';
import { classToClass } from 'class-transformer';

export default class DoctorAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: doctor_id } = request.user;
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

  public async teste(request: Request, response: Response): Promise<Response> {
    const { id: doctor_id } = request.user;

    const { day, month, year } = request.query;

    const teste = container.resolve(Teste);

    const appointments = await teste.execute({
      doctor_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}
