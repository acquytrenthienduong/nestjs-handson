import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Email phải có định dạng hợp lệ' })
    email: string;

    @IsString({ message: 'Password phải là string' })
    @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
    @MaxLength(20, { message: 'Password không được vượt quá 20 ký tự' })
    password: string;
} 