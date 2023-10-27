import { randomUUID } from 'node:crypto';
import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  password: string;
  status: boolean;
  createdAt: Date;

  private constructor(user: { [key: string]: any }) {
    this.id = user.id ?? randomUUID();
    this.email = user.email;
    this.name = user.name;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.password = user.password;
    this.status = user.status ?? true;
    this.createdAt = user.createdAt ?? new Date();
  }

  static create(user: { [key: string]: any }): User {
    return new User(user);
  }
}
