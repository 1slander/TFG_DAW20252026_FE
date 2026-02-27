import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayloadInterface {
  sub: string;
  role: string;
  exp: number;
}

export type UserRole = 'ROLE_EMPLOYEE' | 'ROLE_OWNER' | 'ROLE_ADMIN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Cambiar a 'EMPLOYEE', 'OWNER' o 'ADMIN' para probar la UI
  private roleSignal = signal<UserRole>("ROLE_ADMIN");

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
  get roleValue(): UserRole {
    return this.roleSignal();
  }

  /**
   * Obtiene el nivel numérico del rol actual
   */
  get currentLevel(): number {
    return this.roleLevels[this.roleSignal()];
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
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
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
