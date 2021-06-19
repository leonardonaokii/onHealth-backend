import { injectable, inject } from 'tsyringe';

import ISymptomsRepository from '../repositories/ISymptomsRepository';
import Symptoms from '../infra/typeorm/entities/Symptoms';

@injectable()
class ListSymptomsService {
  constructor(
    @inject('SymptomsRepository')
    private symtomsRepository: ISymptomsRepository,
  ) {}

  public async execute(): Promise<Symptoms[]> {
    const symptoms = await this.symtomsRepository.list();

    return symptoms;
  }
}

export default ListSymptomsService;
