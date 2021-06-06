export default interface IFindAllDTO {
  user_id: string;
  page?: number;
  order?: 'ASC' | 'DESC';
  perPage?: number;
}
