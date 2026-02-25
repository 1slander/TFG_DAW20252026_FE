import { Injectable, signal } from '@angular/core';

export type UserRole = 'EMPLOYEE' | 'OWNER' | 'ADMIN';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Cambiar a 'EMPLOYEE', 'OWNER' o 'ADMIN' para probar la UI
    private roleSignal = signal<UserRole>('ADMIN');

    // Mantenemos los niveles simplificados
    private readonly roleLevels: Record<UserRole, number> = {
        'EMPLOYEE': 0,
        'OWNER': 1,
        'ADMIN': 2
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
}
