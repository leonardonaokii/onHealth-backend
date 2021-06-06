import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { UserType } from '@config/enums';
import IDoctorsRepository from '../../repositories/IDoctorsRepository';
import Doctor from '../../infra/typeorm/entities/Doctor';

interface IRequest {
  id: string;
  type: UserType;
  medical_specialty: number;
}

@injectable()
class UpdateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    id,
    type,
    medical_specialty,
  }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) {
      throw new AppError('Doctor not found');
    }

    const checkDoctorExistsByCrm = await this.doctorsRepository.findByCrm(
      doctor.crm,
    );

    if (checkDoctorExistsByCrm) {
      throw new AppError('Crm already registered');
    }

    if (type !== UserType.doctor) {
      throw new AppError('Wrong user type.');
    }

    doctor.medical_specialty = medical_specialty;

    await this.doctorsRepository.save(doctor);

    return doctor;
  }
}

export default UpdateDoctorService;
