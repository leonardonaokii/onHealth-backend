import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDoctorDayAvailabilityService from '@modules/appointments/services/ListDoctorDayAvailabilityService';

export default class doctorMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { doctor_id } = request.params;
    const { month, year, day } = request.query;

    const listdoctorDayAvailabilityService = container.resolve(
      ListDoctorDayAvailabilityService,
    );

    const availability = await listdoctorDayAvailabilityService.execute({
      patient_id: id,
      doctor_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(availability);
  }
}
