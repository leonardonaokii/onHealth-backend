export default interface ICreateAppointmentDTO {
  patient_id: string;
  doctor_id: string;
  date: Date;
  symptoms: number;
  description?: string;
}
