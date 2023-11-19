import { $Enums, User } from '@prisma/client';
export class UserEntity implements User {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  role: $Enums.Role;
}
