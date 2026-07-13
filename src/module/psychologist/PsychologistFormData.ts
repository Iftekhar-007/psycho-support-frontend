import { z } from "zod";

export const psychologistSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  contactNumber: z.string().min(11),
  address: z.string().min(5),
  profilePhoto: z.string().url(),
  sector: z.string().min(2),
  availability: z.string().min(2),
  appointmentFee: z.number().positive(),
  qualification: z.string().min(5),
  licenseId: z.string().min(3),
  experience: z.number().min(0),
});

export type PsychologistFormData = z.infer<typeof psychologistSchema>;
