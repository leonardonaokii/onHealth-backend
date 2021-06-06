import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMedicalSpecialtyRepository from '../repositories/IMedicalSpecialtyRepository';
import MedicalSpecialty from '../infra/typeorm/entities/MedicalSpecialty';

@injectable()
class CreateMedicalSpecialtyService {
  constructor(
    @inject('MedicalSpecialtyRepository')
    private medicalSpecialtyRepository: IMedicalSpecialtyRepository,
  ) {}

  public async execute(name: string): Promise<MedicalSpecialty> {
    const verifyMedicalSpecialtyExists = await this.medicalSpecialtyRepository.findByName(
      name,
    );

    if (verifyMedicalSpecialtyExists) {
      throw new AppError('This medical specialty already exists.');
    }

    const medicalSpecialty = await this.medicalSpecialtyRepository.create(name);

    return medicalSpecialty;
  }
}

export default CreateMedicalSpecialtyService;
