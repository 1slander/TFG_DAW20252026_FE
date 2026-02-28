import { inject, Injectable } from '@angular/core';
import { RoleCreateInterface, RoleInterface, RoleResponseInterface } from '../../interfaces/role';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private roleList: RoleInterface[] = [];

  private http = inject(HttpClient);

  getRoles() {
    return this.http.get<RoleResponseInterface[]>(`${environment.apiUrl}admin/roles`);
  }

  getRoleByName(name: string) {
    return this.roleList.find(r => r.roleName === name);
  }

  createRole(role: RoleCreateInterface) {
    return this.http.post<RoleResponseInterface>(`${environment.apiUrl}admin/crear-role`, role);
  }

  deleteById(id: number) {
    return this.http.delete(`${environment.apiUrl}admin/roles/${id}`, { responseType: 'text' });
  }
}
