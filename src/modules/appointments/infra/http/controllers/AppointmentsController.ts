import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { classToClass } from 'class-transformer';
import ShowAppointmentService from '@modules/appointments/services/ShowAppointmentService';
import UpdateAppointmentService from '@modules/appointments/services/UpdateAppointmentService';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { appointment_id } = request.params;

    const showAppointmentService = container.resolve(ShowAppointmentService);

    const appointment = await showAppointmentService.execute(appointment_id);

    return response.json(classToClass(appointment));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { appointment_id } = request.params;

    const { description, result } = request.body;

    const updateAppointmentService = container.resolve(
      UpdateAppointmentService,
    );

    const appointment = await updateAppointmentService.execute({
      id: appointment_id,
      description,
      result,
    });

    return response.json(classToClass(appointment));
  }
}
