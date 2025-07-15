import { IsEmail, IsString, MinLength, MaxLength, IsIn } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateUserDto {
    @IsEmail({}, { message: 'Email phải có định dạng hợp lệ' })
    email: string;

    @IsString({ message: 'Password phải là string' })
    @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
    @MaxLength(20, { message: 'Password không được vượt quá 20 ký tự' })
    password: string;

    @IsString({ message: 'Role phải là string' })
    @IsIn([Role.Admin, Role.SubAdmin], { message: 'Role phải là admin hoặc sub_admin' })
    role: Role;
} 