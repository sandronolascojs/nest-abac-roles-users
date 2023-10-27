import { Injectable } from '@nestjs/common';
import { IStorage } from '../../modules/users/interfaces/IStorage';

@Injectable()
export class AWSS3Storage implements IStorage {
  async deleteFile(file: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async uploadFile(file: any): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
