import { SetMetadata } from '@nestjs/common';
import { $Enums } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Role = (...roles: $Enums.Role[]) => SetMetadata(ROLES_KEY, roles);