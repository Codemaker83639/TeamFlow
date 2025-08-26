import { SetMetadata } from '@nestjs/common';
// --- CAMBIO EN LA SIGUIENTE LÍNEA ---
import { UserRole } from '../entities/user.enums'; // Apuntamos al nuevo archivo de enums

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);