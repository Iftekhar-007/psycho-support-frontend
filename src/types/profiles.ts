export type UserRole = "USER" | "ADMIN" | "PATIENT" | "PSYCHOLOGIST";
export type PsychologistStatus = "FEATURED" | "REGULAR" | "DELETED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isDeleted: boolean;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PsychologistProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  address: string | null;
  contactNumber: string | null;
  verified: boolean;
  sector: string | null;
  availability: string | null;
  appointmentFee: number | null;
  qualification: string | null;
  licenseId: string | null;
  experience: number | null;
  status: PsychologistStatus;
  createdAt: string;
  updatedAt: string;
}

// Still a guess — share your Patient model whenever you have it handy
export interface PatientProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  address: string | null;
  contactNumber: string | null;
  age?: number | null;
  gender?: string | null;
  bloodGroup?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type MyProfileResponse =
  | (BaseUser & { role: "PATIENT"; profile: PatientProfile | null })
  | (BaseUser & { role: "PSYCHOLOGIST"; profile: PsychologistProfile | null })
  | (BaseUser & { role: "USER" | "ADMIN"; profile: null });
