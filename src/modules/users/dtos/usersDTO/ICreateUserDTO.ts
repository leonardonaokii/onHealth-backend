import { UserType } from '@config/enums';

interface ICreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  type: UserType;
}

export default ICreateUserDTO;
