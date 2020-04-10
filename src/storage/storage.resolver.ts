import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { StorageService } from './storage.service';

@Resolver()
export class StorageResolver {
  constructor(private readonly storageService: StorageService) {}

  @Mutation(() => String)
  async fileUpload(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<String> {
    return await this.storageService.fileUpload(file);
  }

  @Mutation(() => String)
  async aliyunFileUpload(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<String> {
    return await this.storageService.aliyunFileUpload(file);
  }
}
