import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDoctorService from '@modules/users/services/doctor/CreateDoctorService';
import { classToClass } from 'class-transformer';
import UpdateDoctorService from '@modules/users/services/doctor/UpdateDoctorService';
import ShowDoctorService from '@modules/users/services/doctor/ShowDoctorService';
import CheckCrmAvailabilityService from '@modules/users/services/doctor/CheckCrmAvailabilityService';
import ListDoctorsService from '@modules/users/services/doctor/ListDoctorsService';

class DoctorsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id, type, crm, medical_specialty } = request.body;

    const createUserService = container.resolve(CreateDoctorService);

    const doctor = await createUserService.execute({
      id,
      crm,
      medical_specialty,
      type,
    });

    return response.json(classToClass(doctor));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, type } = request.user;

    const { medical_specialty } = request.body;

    const updateDoctorService = container.resolve(UpdateDoctorService);

    const doctor = await updateDoctorService.execute({
      id,
      type,
      medical_specialty,
    });

    return response.json(classToClass(doctor));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id, type } = request.user;

    const showDoctorService = container.resolve(ShowDoctorService);

    const doctor = await showDoctorService.execute({
      id,
      type,
    });

    return response.json(classToClass(doctor));
  }

  public async crmAvailability(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { crm } = request.params;

    const checkCrmAvailabilityService = container.resolve(
      CheckCrmAvailabilityService,
    );

    const validation = await checkCrmAvailabilityService.execute(crm);

    return response.json(validation);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { medical_specialty_id } = request.query;

    const listDoctorsService = container.resolve(ListDoctorsService);

    const doctors = await listDoctorsService.execute(
      Number(medical_specialty_id),
    );

    return response.json(classToClass(doctors));
  }
}

export default DoctorsControllers;
