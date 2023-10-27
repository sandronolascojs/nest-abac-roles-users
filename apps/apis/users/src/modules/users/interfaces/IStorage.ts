export interface IStorage {
  deleteFile(file: string): Promise<void>;
  uploadFile(file: any): Promise<string>;
}
