import MedicalSpecialty from '../infra/typeorm/entities/MedicalSpecialty';

interface IMedicalSpecialtyRepository {
  create(name: string): Promise<MedicalSpecialty>;
  list(): Promise<MedicalSpecialty[]>;
  findByName(name: string): Promise<MedicalSpecialty | undefined>;
}

export default IMedicalSpecialtyRepository;
