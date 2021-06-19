import Symptoms from '../infra/typeorm/entities/Symptoms';

interface IMedicalSpecialtyRepository {
  create(name: string): Promise<Symptoms>;
  list(): Promise<Symptoms[]>;
  findByName(name: string): Promise<Symptoms | undefined>;
}

export default IMedicalSpecialtyRepository;
