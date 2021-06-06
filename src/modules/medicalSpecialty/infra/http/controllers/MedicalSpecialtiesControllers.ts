import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMedicalSpecialtyService from '@modules/medicalSpecialty/services/CreateMedicalSpecialtyService';
import ListMedicalSpecialtiesService from '@modules/medicalSpecialty/services/ListMedicalSpecialtiesService';

class MedicalSpecialtiesControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createMedicalSpecialtyService = container.resolve(
      CreateMedicalSpecialtyService,
    );

    const medicalSpecialty = await createMedicalSpecialtyService.execute(name);

    return response.json(medicalSpecialty);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listMedicalSpecialtiesService = container.resolve(
      ListMedicalSpecialtiesService,
    );

    const medicalSpecialty = await listMedicalSpecialtiesService.execute();

    return response.json(medicalSpecialty);
  }
}

export default MedicalSpecialtiesControllers;
