import { User } from '../entities/user';

export class UserMapper {
  public static toViewModel(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      status: user.status,
      createdAt: user.createdAt,
    };
  }

  public static toViewModelList(users: User[]) {
    return users.map((user) => this.toViewModel(user));
  }
}

export interface UserViewModel {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  status: boolean;
  createdAt: Date;
}
