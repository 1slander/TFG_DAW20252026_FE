import { Injectable } from '@angular/core';
import { RoleInterface, RoleName } from '../../interfaces/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleList: RoleInterface[] = [
    {
      id: 1,
      roleName: 'OWNER',
      roleCategory: 'OWNER',
    },
    {
      id: 2,
      roleName: 'MANAGER',
      roleCategory: 'EMPLOYEE',
    },
    {
      id: 3,
      roleName: 'ASSISTANT_MANAGER',
      roleCategory: 'EMPLOYEE',
    },
    {
      id: 4,
      roleName: 'TEAM_LEADER',
      roleCategory: 'EMPLOYEE',
    },
    {
      id: 5,
      roleName: 'EMPLOYEE',
      roleCategory: 'EMPLOYEE',
    },
  ];

  getRoles() {
    const roleListResult = [...this.roleList];
    return roleListResult;
  }

  getRoleByName(roleName: RoleName) {
    const role = this.roleList.find((r) => r.roleName === roleName);
    if (!role) return;
    return role;
  }
}
