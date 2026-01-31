export type RoleCategory = 'ADMIN' | 'OWNER' | 'EMPLOYEE';
export type RoleName = 'OWNER' | 'MANAGER' | 'ASSISTANT_MANAGER' | 'TEAM_LEADER' | 'EMPLOYEE';

export interface RoleInterface {
  id: number;
  roleName: string;
  roleCategory: RoleCategory; // O usa tu tipo RoleCategory
}
