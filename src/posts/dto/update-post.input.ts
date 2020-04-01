import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field()
  @IsNotEmpty()
  body: string;
}
