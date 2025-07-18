import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorator/role.decorator";
import { Role } from "src/enum/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        
        // Kiểm tra user tồn tại (theo NestJS docs)
        if (!user) {
            return false;
        }

        // Support cả single role và array roles (linh hoạt hơn)
        const userRoles = Array.isArray(user.roles) ? user.roles : [user.role];
        
        return requiredRoles.some((role) => userRoles.includes(role));
    }
}