import { SetMetadata } from '@nestjs/common';
// --- RUTA CORREGIDA ---
// Asumiendo que tu estructura es src/auth y src/users
import { UserRole } from '../../auth/entities/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);