export type RoleCategory = 'ADMIN'|'OWNER'|'EMPLOYEE'

//DE DONDE SALE? LO PONEMOS COMO OPTIONAL??
export type RoleName = 'OWNER'|'MANAGER'| 'ASSISTANT_MANAGER'|'TEAM_LEADER'|'EMPLOYEE'

export interface RoleInterface{
    id:number;
    roleName: RoleName;
    roleCategory?: RoleCategory
}