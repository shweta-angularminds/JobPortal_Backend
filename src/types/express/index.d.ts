import { AuthenticatedUser } from "../../constants/interfaces/auth.interface";

declare global {
  namespace Express {
     export interface Request {
       user?: AuthenticatedUser;
     }
  }
}
export {};