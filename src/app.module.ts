import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      uploads: {
        maxFileSize: 10000000, // 10 MB
        maxFiles: 1,
      },
    }),
    StorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
