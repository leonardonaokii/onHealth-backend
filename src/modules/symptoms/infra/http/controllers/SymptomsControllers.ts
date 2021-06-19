import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSymptomService from '@modules/symptoms/services/CreateSymptomService';
import ListSymptomsService from '@modules/symptoms/services/ListSymptomsService';

class MedicalSpecialtiesControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSymptomService = container.resolve(CreateSymptomService);

    const symptom = await createSymptomService.execute(name);

    return response.json(symptom);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listSymptomsService = container.resolve(ListSymptomsService);

    const symptoms = await listSymptomsService.execute();

    return response.json(symptoms);
  }
}

export default MedicalSpecialtiesControllers;
