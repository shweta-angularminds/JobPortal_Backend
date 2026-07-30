export interface employer {
  employer_name: string;
  email: string;
  companyName: string;
  companyLogo: string;
  contactNumber: string;
  address: string;
  website: string;
  password: string;
}

export interface RegisterEmployerDto {
  employer_name: string;
  email: string;
  companyName: string;
  contactNumber: string;
  address: string;
  website: string;
  password: string;
}
export type GetEmployersInput = {
  page: number;
  limit: number;
  search?: string;
};
export interface GetEmployersQuery {
  page?: string;
  limit?: string;
  search?: string;
}

export interface UpdateEmployerDto {
  employer_name: string;
  email: string;
  companyName: string;
  contactNumber: string;
  address: string;
  website: string;
  companyLogo?: string;
}

export interface ChangePasswordDto {
  password: string;
  newPassword: string;
}
