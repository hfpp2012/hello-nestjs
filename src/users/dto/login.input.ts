import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CheckUserExistAndComparePassword } from '../validators/CheckUserExistAndComparePassword';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  @CheckUserExistAndComparePassword('username')
  password: string;
}
