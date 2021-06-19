import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISymptomsRepository from '../repositories/ISymptomsRepository';
import Symptoms from '../infra/typeorm/entities/Symptoms';

@injectable()
class CreateSymptomService {
  constructor(
    @inject('SymptomsRepository')
    private symptomsRepository: ISymptomsRepository,
  ) {}

  public async execute(name: string): Promise<Symptoms> {
    const verifyMedicalSpecialtyExists = await this.symptomsRepository.findByName(
      name,
    );

    if (verifyMedicalSpecialtyExists) {
      throw new AppError('This symptom already exists.');
    }

    const symptom = await this.symptomsRepository.create(name);

    return symptom;
  }
}

export default CreateSymptomService;
