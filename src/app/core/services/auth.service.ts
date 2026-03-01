import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environment';

interface JwtPayloadInterface {
  sub: string;
  role: string;
  exp: number;
}

export type UserRole = 'ROLE_EMPLOYEE' | 'ROLE_OWNER' | 'ROLE_ADMIN';

export interface LoginCredentials {
  dni?: string;
  username?: string; // used by admin login
  password?: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roleSignal = signal<UserRole | null>(null);
  private usernameSignal = signal<string | null>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    const role = this.getRole();
    const tokenPayload = this.getDecodedToken();

    if (role) {
      this.roleSignal.set(role as UserRole);
    }
    if (tokenPayload && tokenPayload.sub) {
      this.usernameSignal.set(tokenPayload.sub);
    }
  }

  get usernameValue(): string | null {
    return this.usernameSignal();
  }

  /**
   * Performs standard user login using DNI and password
   */
  login(credentials: LoginCredentials) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}login`, credentials);
  }

  /**
   * Envía la solicitud de registro de un nuevo Owner.
   */
  submitRegistration(data: any) {
    return this.http.post(`${environment.apiUrl}signup`, data);
  }

  // Mantenemos los niveles simplificados
  private readonly roleLevels: Record<UserRole, number> = {
    "ROLE_EMPLOYEE": 0,
    "ROLE_OWNER": 1,
    "ROLE_ADMIN": 2,
  };

  /**
   * Obtiene el rol actual de forma reactiva (Signal)
   */
  get currentRole() {
    return this.roleSignal.asReadonly();
  }

  /**
   * Obtiene el valor string del rol para comprobaciones de igualdad directa
   */
  get roleValue(): UserRole | null {
    return this.roleSignal();
  }

  /**
   * Obtiene el nivel numérico del rol actual
   */
  get currentLevel(): number {
    const role = this.roleSignal();
    return role ? this.roleLevels[role] : -1;
  }

  /**
   * Verifica si el usuario actual tiene el nivel necesario
   */
  hasAccess(requiredLevel: number): boolean {
    return this.currentLevel >= requiredLevel;
  }

  /**
   * Cierra la sesión y redirige al login
   */

  saveToken(token: string) {
    localStorage.setItem('token', token);
    const decoded = this.getDecodedToken();
    if (decoded && decoded.role) {
      this.roleSignal.set(decoded.role as UserRole);
    }
    if (decoded && decoded.sub) {
      this.usernameSignal.set(decoded.sub);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.roleSignal.set(null);
    this.usernameSignal.set(null);
  }

  getDecodedToken(): JwtPayloadInterface | null {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode<JwtPayloadInterface>(token);
  }

  getRole(): string | null {
    // const role = this.getDecodedToken()?.role ?? null; 
    // this.roleSignal.set(role === null ? "ROLE_EMPLOYEE" : role) 
    return this.getDecodedToken()?.role ?? null;
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }
}
