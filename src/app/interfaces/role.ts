<<<<<<< HEAD
export type RoleCategory = 'ADMIN' | 'OWNER' | 'EMPLOYEE';
export type RoleName = 'OWNER' | 'MANAGER' | 'ASSISTANT_MANAGER' | 'TEAM_LEADER' | 'EMPLOYEE';

export interface RoleInterface {
  id: number;
  roleName: string;
  roleCategory: RoleCategory; // O usa tu tipo RoleCategory
}
=======
export type RoleCategory = 'ADMIN'|'OWNER'|'EMPLOYEE'

//DE DONDE SALE? LO PONEMOS COMO OPTIONAL??
export type RoleName = 'OWNER'|'MANAGER'| 'ASSISTANT_MANAGER'|'TEAM_LEADER'|'EMPLOYEE'

export interface RoleInterface{
    id:number;
    roleName: RoleName;
    roleCategory?: RoleCategory
}
>>>>>>> 983e1e65b784a593d8a4c0ad6b1d9f18a6eb2547
