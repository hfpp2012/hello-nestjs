import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  confirmPassword: string;
}
