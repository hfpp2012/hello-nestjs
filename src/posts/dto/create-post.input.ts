import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PostInput {
  @Field()
  @IsNotEmpty()
  body: string;
}
