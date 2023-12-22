import { $Enums, User } from '@prisma/client';
export class UserEntity implements User {
  id: string;
  cpf: string;
  email: string;
  password: string;
  createdAt: Date;
  role: $Enums.Role;
}
