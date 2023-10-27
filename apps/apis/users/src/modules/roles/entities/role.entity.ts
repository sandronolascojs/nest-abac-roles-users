import { randomUUID } from 'node:crypto';
import { IRole } from '../interfaces/IRole';

export class Role implements IRole {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: boolean;
  createdAt: Date;

  constructor(role: { [key: string]: any }) {
    this.id = role.id ?? randomUUID();
    this.name = role.name;
    this.slug = role.slug;
    this.description = role.description ?? '';
    this.status = role.status ?? true;
    this.createdAt = role.createdAt ?? new Date();
  }

  static create(role: { [key: string]: any }): Role {
    return new Role(role);
  }
}
