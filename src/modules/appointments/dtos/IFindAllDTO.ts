export default interface IFindAllDTO {
  patient_id: string;
  page?: number;
  order?: 'ASC' | 'DESC';
  perPage?: number;
}
