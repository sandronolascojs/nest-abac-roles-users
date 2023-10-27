import { IRole } from './IRole';

export interface IUserRole {
  id: string;
  user_id: string;
  role_id: string;
  status: boolean;
  createdAt: Date;
  role: IRole;
}
