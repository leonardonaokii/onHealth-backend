import { injectable, inject } from 'tsyringe';

import IMedicalSpecialtyRepository from '../repositories/IMedicalSpecialtyRepository';
import MedicalSpecialty from '../infra/typeorm/entities/MedicalSpecialty';

@injectable()
class ListMedicalSpecialtiesService {
  constructor(
    @inject('MedicalSpecialtyRepository')
    private medicalSpecialtyRepository: IMedicalSpecialtyRepository,
  ) {}

  public async execute(): Promise<MedicalSpecialty[]> {
    const medicalSpecialty = await this.medicalSpecialtyRepository.list();

    return medicalSpecialty;
  }
}

export default ListMedicalSpecialtiesService;
