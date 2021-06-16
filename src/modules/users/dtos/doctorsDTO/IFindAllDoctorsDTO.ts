interface IFindAllDoctorsDTO {
  filterBy?: 'medical_specialty' | 'rating' | null;
  filterValue?: any;
  page: number;
  perPage: number;
  order: 'ASC' | 'DESC';
}

export default IFindAllDoctorsDTO;
