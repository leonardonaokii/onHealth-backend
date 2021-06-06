import Doctor from '@modules/users/infra/typeorm/entities/Doctor';

interface IFindAllDoctorsResponseDTO {
  doctors: Doctor[];
  page: number;
  total: number;
  lastPage: number;
}

export default IFindAllDoctorsResponseDTO;
