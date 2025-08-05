import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
// --- RUTA CORREGIDA ---
import { UserRole } from '../../auth/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        // Tu 'user.entity' ya define el rol como UserRole, así que esto funciona directamente.
        // El payload de tu JWT debe contener la propiedad 'role'.
        return requiredRoles.some((role) => user.role?.includes(role));
    }
}