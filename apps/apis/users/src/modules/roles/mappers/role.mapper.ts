export interface IUsersFromRole {
  id: string;
  role: string;
  description: string;
  slug: string;
  status: boolean;
  users: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    status: boolean;
  };
}

export class RoleMapper {
  public static usersFromRole(roleAndUsers: any): IUsersFromRole {
    return {
      id: roleAndUsers[0].role.id,
      role: roleAndUsers[0].role.name,
      description: roleAndUsers[0].role.description,
      slug: roleAndUsers[0].role.slug,
      status: roleAndUsers[0].role.status,
      users: roleAndUsers.map((user) => {
        return {
          id: user.user.id,
          name: user.user.name,
          lastName: user.user.lastName,
          email: user.user.email,
          status: user.user.status,
        };
      }),
    };
  }
}
