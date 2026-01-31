import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { RoleInterface } from '../../interfaces/role';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private roleList: RoleInterface[] = [
    { id: 1, roleName: 'OWNER', roleCategory: 'OWNER' },
    { id: 2, roleName: 'MANAGER', roleCategory: 'EMPLOYEE' },
    { id: 3, roleName: 'ASSISTANT_MANAGER', roleCategory: 'EMPLOYEE' },
    { id: 4, roleName: 'TEAM_LEADER', roleCategory: 'EMPLOYEE' },
    { id: 5, roleName: 'EMPLOYEE', roleCategory: 'EMPLOYEE' },
  ];

  getRoles() { return [...this.roleList]; }

  getRoleByName(name: string) {
    return this.roleList.find(r => r.roleName === name);
  }

  createRole(role: Omit<RoleInterface, 'id'>) {
    const maxId = this.roleList.length === 0 ? 1 : Math.max(...this.roleList.map(r => r.id)) + 1;
    this.roleList.push({ id: maxId, ...role });
  }

  deleteById(id: number) {
    this.roleList = this.roleList.filter(r => r.id !== id);
=======
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
>>>>>>> 983e1e65b784a593d8a4c0ad6b1d9f18a6eb2547
  }
}
