import { IRole } from '../interfaces/IRole';
import { IUserRole } from '../interfaces/IUserRole';

export interface IUserRoleViewModel {
  id: string;
  status: boolean;
  createdAt: Date;
  role: IRole;
}

export class UserRoleMapper {
  public static userRoleToViewModel(userRole: IUserRole): IUserRoleViewModel {
    return {
      id: userRole.id,
      status: userRole.status,
      createdAt: userRole.createdAt,
      role: userRole.role,
    };
  }

  public static userRolesToViewModels(
    userRoles: IUserRole[],
  ): IUserRoleViewModel[] {
    return userRoles.map((userRole) => {
      return this.userRoleToViewModel(userRole);
    });
  }
}
