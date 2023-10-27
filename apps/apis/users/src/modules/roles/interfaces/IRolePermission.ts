import { IPermission } from './IPermission';
import { IRole } from './IRole';

export interface IRolePermission {
  id: string;
  role_id: string;
  permission_id: string;
  role: IRole;
  permission: IPermission;
}
