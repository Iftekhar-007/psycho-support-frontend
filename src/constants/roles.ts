export const Roles = {
  admin: "ADMIN",
  psychologist: "PSYCHOLOGIST",
  patient: "PATIENT",
} as const;

export const userRole = {
  ADMIN: "ADMIN",
  PSYCHOLOGIST: "PSYCHOLOGIST",
  PATIENT: "PATIENT",
} as const;

export type UserRole = (typeof Roles)[keyof typeof Roles];

export const routePermissions: Record<string, string[]> = {
  "/admin": [Roles.admin],
  "/admin-dashboard": [Roles.admin],
  "/all-users": [Roles.admin],
  "/confirm-users": [Roles.admin],
  "/all-psychologists": [Roles.admin],
  "/all-patients": [Roles.admin],
  "/psychologist": [Roles.psychologist],
  "/psychologist-dashboard": [Roles.psychologist],
  "/patient": [Roles.patient],
  "/patient-dashboard": [Roles.patient],
  "/dashboard": [Roles.admin, Roles.psychologist, Roles.patient],
  "/my-prescriptions": [Roles.psychologist, Roles.patient],
  "/create-profile/patient": [Roles.patient],
  "/create-profile/psychologist": [Roles.psychologist],
};
