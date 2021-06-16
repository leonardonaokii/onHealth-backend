import { getRepository, Repository } from 'typeorm';
import { inject, injectable } from 'tsyringe';

import IDoctorsRepository from '@modules/users/repositories/IDoctorsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateDoctorsDTO from '@modules/users/dtos/doctorsDTO/ICreateDoctorsDTO';
// import IFindAllDoctorsResponseDTO from '@modules/users/dtos/doctorsDTO/IFindAllDoctorsResponseDTO';
// import IFindAllDoctorsDTO from '@modules/users/dtos/doctorsDTO/IFindAllDoctorsDTO';
import Doctor from '../entities/Doctor';

@injectable()
class DoctorsRepository implements IDoctorsRepository {
  private ormRepository: Repository<Doctor>;

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    this.ormRepository = getRepository(Doctor);
  }

  public async create({
    id,
    crm,
    medical_specialty,
  }: ICreateDoctorsDTO): Promise<Doctor> {
    const doctor = this.ormRepository.create({ id, crm, medical_specialty });

    await this.ormRepository.save(doctor);

    return doctor;
  }

  // public async findAll({
  //   filterBy,
  //   filterValue,
  //   page = 1,
  //   perPage = 9,
  //   order = 'DESC',
  // }: IFindAllDoctorsDTO): Promise<IFindAllDoctorsResponseDTO> {
  //   let doctors: Doctor[];

  //   if (!filterBy || !filterValue) {
  //     doctors = await this.ormRepository.find({
  //       order: {
  //         rating: order,
  //       },
  //       skip: (page - 1) * perPage,
  //       take: perPage,
  //     });

  //     const total = await this.ormRepository.count();
  //     const lastPage = Math.ceil(total / perPage);

  //     return {
  //       doctors,
  //       page,
  //       total,
  //       lastPage,
  //     };
  //   }
  //   doctors = await this.ormRepository.find({
  //     where: {
  //       filterBy: filterValue,
  //     },
  //     order: {
  //       rating: order,
  //     },
  //     skip: (page - 1) * perPage,
  //     take: perPage,
  //   });

  //   const total = await this.ormRepository.count();
  //   const lastPage = Math.ceil(total / perPage);

  //   return {
  //     doctors,
  //     page,
  //     total,
  //     lastPage,
  //   };
  // }

  public async findByCrm(crm: string): Promise<Doctor | undefined> {
    const doctor = await this.ormRepository.findOne({
      where: { crm },
      relations: ['user', 'medspec'],
    });

    return doctor;
  }

  public async findById(id: string): Promise<Doctor | undefined> {
    const doctor = await this.ormRepository.findOne({
      where: { id },
      relations: ['user', 'medspec'],
    });

    return doctor;
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    await this.ormRepository.save(doctor);

    return doctor;
  }

  public async findAll(): Promise<Doctor[]> {
    const doctors = await this.ormRepository.find({
      relations: ['user', 'medspec'],
    });

    return doctors;
  }

  public async findByMedicalSpecialty(
    medical_specialty_id: number,
  ): Promise<Doctor[]> {
    return this.ormRepository.find({
      where: { medical_specialty: medical_specialty_id },
      relations: ['user', 'medspec'],
    });
  }
}

export default DoctorsRepository;
