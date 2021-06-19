import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import doctorsRouter from '@modules/users/infra/http/routes/doctors.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import medicalSpecialtyRouter from '@modules/medicalSpecialty/infra/http/routes/medicalSpecialty.routes';
import symptomsRouter from '@modules/symptoms/infra/http/routes/symptom.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/doctors', doctorsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/medical-specialty', medicalSpecialtyRouter);
routes.use('/symptoms', symptomsRouter);

export default routes;
