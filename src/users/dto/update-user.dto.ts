import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail({}, { message: 'Email phải có định dạng hợp lệ' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Password phải là string' })
    @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
    @MaxLength(20, { message: 'Password không được vượt quá 20 ký tự' })
    password?: string;
} 