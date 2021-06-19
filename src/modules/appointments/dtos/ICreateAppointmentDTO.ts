interface ISymptoms {
  symptom_id: number;
}

export default interface ICreateAppointmentDTO {
  patient_id: string;
  doctor_id: string;
  date: Date;
  symptoms: ISymptoms[];
  description?: string;
}
