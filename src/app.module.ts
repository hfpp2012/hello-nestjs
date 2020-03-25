import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
