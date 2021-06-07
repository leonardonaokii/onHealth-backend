import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { classToClass } from 'class-transformer';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const patient_id = request.user.id;
    const { doctor_id, date, symptoms, description } = request.body;

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      date,
      doctor_id,
      patient_id,
      symptoms,
      description,
    });

    return response.json(classToClass(appointment));
  }
}
