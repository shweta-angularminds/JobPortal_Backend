
export interface JwtPayload {
  sub: string;
  role: "jobseeker" | "employer";
}

export interface AuthenticatedUser {
  id: string;
  role: "jobseeker" | "employer";
}

