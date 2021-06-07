import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDoctorMonthAvailabilityService from '@modules/appointments/services/ListDoctorMonthAvailabilityService';

export default class DoctorMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { doctor_id } = request.params;
    const { month, year } = request.query;

    const listDoctorMonthAvailabilityService = container.resolve(
      ListDoctorMonthAvailabilityService,
    );

    const availability = await listDoctorMonthAvailabilityService.execute({
      doctor_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
