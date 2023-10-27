export interface IPermission {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  action: string;
  subject: string;
  status: boolean;
  createdAt: Date;
}
