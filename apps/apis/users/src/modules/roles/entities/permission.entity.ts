import { randomUUID } from 'crypto';
import { IPermission } from '../interfaces/IPermission';

export class Permission implements IPermission {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  action: string;
  subject: string;
  status: boolean;
  createdAt: Date;

  private constructor(permission: { [key: string]: any }) {
    this.id = permission.id ?? randomUUID();
    this.name = permission.name;
    this.slug = permission.slug;
    this.action = permission.action;
    this.subject = permission.subject;
    this.description = permission.description ?? '';
    this.status = permission.status ?? true;
    this.createdAt = permission.createdAt ?? new Date();
  }

  static create(permission: { [key: string]: any }): Permission {
    return new Permission(permission);
  }
}
