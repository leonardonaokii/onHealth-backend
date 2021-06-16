import { inject, injectable } from 'tsyringe';

import Doctor from '../../infra/typeorm/entities/Doctor';
import IDoctorsRepository from '../../repositories/IDoctorsRepository';

@injectable()
class ListDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(medical_specialty: number): Promise<Doctor[]> {
    if (!medical_specialty) {
      return this.doctorsRepository.findAll();
    }

    return this.doctorsRepository.findByMedicalSpecialty(medical_specialty);
  }
}

export default ListDoctorService;
