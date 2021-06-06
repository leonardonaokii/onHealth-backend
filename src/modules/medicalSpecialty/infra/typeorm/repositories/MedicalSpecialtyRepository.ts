import IMedicalSpecialtyRepository from '@modules/medicalSpecialty/repositories/IMedicalSpecialtyRepository';
import { getRepository, Repository } from 'typeorm';
import MedicalSpecialty from '../entities/MedicalSpecialty';

class MedicalSpecialtyRepository implements IMedicalSpecialtyRepository {
  private ormRepository: Repository<MedicalSpecialty>;

  constructor() {
    this.ormRepository = getRepository(MedicalSpecialty);
  }

  public async create(name: string): Promise<MedicalSpecialty> {
    const medicalSpecialty = this.ormRepository.create({ name });

    await this.ormRepository.save(medicalSpecialty);

    return medicalSpecialty;
  }

  public async list(): Promise<MedicalSpecialty[]> {
    return this.ormRepository.find();
  }

  public async findByName(name: string): Promise<MedicalSpecialty | undefined> {
    return this.ormRepository.findOne({
      where: { name },
    });
  }
}

export default MedicalSpecialtyRepository;
