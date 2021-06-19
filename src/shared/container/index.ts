import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/ApppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IDoctorsRepository from '@modules/users/repositories/IDoctorsRepository';
import DoctorsRepository from '@modules/users/infra/typeorm/repositories/DoctorsRepository';

import IMedicalSpecialtyRepository from '@modules/medicalSpecialty/repositories/IMedicalSpecialtyRepository';
import MedicalSpecialtyRepository from '@modules/medicalSpecialty/infra/typeorm/repositories/MedicalSpecialtyRepository';

import ISymptomsRepository from '@modules/symptoms/repositories/ISymptomsRepository';
import SymptomsRepository from '@modules/symptoms/infra/typeorm/repositories/SymptomsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorsRepository,
);

container.registerSingleton<IMedicalSpecialtyRepository>(
  'MedicalSpecialtyRepository',
  MedicalSpecialtyRepository,
);

container.registerSingleton<ISymptomsRepository>(
  'SymptomsRepository',
  SymptomsRepository,
);
