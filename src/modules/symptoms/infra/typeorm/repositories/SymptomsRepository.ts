import IMedicalSpecialtyRepository from '@modules/symptoms/repositories/ISymptomsRepository';
import { getRepository, Repository } from 'typeorm';
import Symptoms from '../entities/Symptoms';

class MedicalSpecialtyRepository implements IMedicalSpecialtyRepository {
  private ormRepository: Repository<Symptoms>;

  constructor() {
    this.ormRepository = getRepository(Symptoms);
  }

  public async create(name: string): Promise<Symptoms> {
    const medicalSpecialty = this.ormRepository.create({ name });

    await this.ormRepository.save(medicalSpecialty);

    return medicalSpecialty;
  }

  public async list(): Promise<Symptoms[]> {
    return this.ormRepository.find();
  }

  public async findByName(name: string): Promise<Symptoms | undefined> {
    return this.ormRepository.findOne({
      where: { name },
    });
  }
}

export default MedicalSpecialtyRepository;
