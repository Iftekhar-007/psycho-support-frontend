export interface Appointment {
  id: string;
  date: string;
  duration: number;
  patientIssue: string;
  recordHistory: string;
  appointmentStatus: string;
  paymentStatus: string;
  meetLink: string | null;

  psychologist: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    sector: string;
    appointmentFee: number;
    experience: number;
  };
}
