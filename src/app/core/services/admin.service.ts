import { inject, Injectable } from '@angular/core';
import {
  AdminCreateInterface,
  AdminInterface,
  AdminResponseInterface,
} from '../../interfaces/admin';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { tap } from 'rxjs';

interface LoginRequestInterface {
  username: string;
  password: string;
}

interface LoginResponseInterface {
  token: string;
}

interface CreateOwnerRequestInterface {
  email: string;
  firstName: string;
  lastName: string;
  dni: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  // CRUD

  getAllAdmins() {
    return this.http.get<AdminResponseInterface[]>(`${environment.apiUrl}admin`);
  }

  createAdmin(newAdmin: AdminCreateInterface) {
    return this.http.post<AdminCreateInterface>(`${environment.apiUrl}admin/signup`, newAdmin);
  }

  deleteById(id: number) {
    return this.http.delete(`${environment.apiUrl}admin/delete-admin/${id}`, {
      responseType: 'text',
    });
  }

  //login de admin
  login(credentials: LoginRequestInterface) {
    return this.http.post<LoginResponseInterface>(`${environment.apiUrl}admin/login`, credentials);
  }

  // Crear Usuario ROLE_OWNER

  createOwner(owner: Omit<CreateOwnerRequestInterface, 'role'>) {
    const payload: CreateOwnerRequestInterface = {
      ...owner,
      role: 'ROLE_OWNER',
    };
    return this.http.post<CreateOwnerRequestInterface>(
      `${environment.apiUrl}employees/create`,
      payload,
    );
  }
}
