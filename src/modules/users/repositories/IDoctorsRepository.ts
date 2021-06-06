import Doctor from '../infra/typeorm/entities/Doctor';
import ICreateDoctorsDTO from '../dtos/doctorsDTO/ICreateDoctorsDTO';
import IFindAllDoctorsDTO from '../dtos/doctorsDTO/IFindAllDoctorsDTO';
import IFindAllDoctorsResponseDTO from '../dtos/doctorsDTO/IFindAllDoctorsResponseDTO';

interface IDoctorsRepository {
  create(data: ICreateDoctorsDTO): Promise<Doctor>;
  findAll(data: IFindAllDoctorsDTO): Promise<IFindAllDoctorsResponseDTO>;
  findByCrm(crm: string): Promise<Doctor | undefined>;
  findById(id: string): Promise<Doctor | undefined>;
  save(doctor: Doctor): Promise<Doctor>;
}

export default IDoctorsRepository;
