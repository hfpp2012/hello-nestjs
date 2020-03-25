import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { IsEqual } from '../validators/IsEqual';
import { IsUserAlreadyExist } from '../validators/IsUserAlreadyExist';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  @IsUserAlreadyExist()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEqual('password')
  confirmPassword: string;
}
