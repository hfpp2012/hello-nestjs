import { FileUpload } from 'graphql-upload';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  async fileUpload(_file: FileUpload): Promise<String> {
    return 'xxx';
  }
}
