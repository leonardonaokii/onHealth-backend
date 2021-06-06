import { inject, injectable } from 'tsyringe';

import IDoctorsRepository from '../../repositories/IDoctorsRepository';

@injectable()
class CheckCrmAvailabilityService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(crm: string): Promise<boolean> {
    const doctor = await this.doctorsRepository.findByCrm(crm);

    if (!doctor) {
      return true;
    }

    return false;
  }
}

export default CheckCrmAvailabilityService;
