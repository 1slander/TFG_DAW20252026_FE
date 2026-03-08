import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // If there's a token and role, allow access
    if (authService.roleValue) {
        return true;
    }

    // Otherwise, redirect to login page
<<<<<<< HEAD
    return router.createUrlTree(['/login']);
=======
    return router.createUrlTree(['/auth/login']);
>>>>>>> b4b5012d82b66cf4d2e53b084b909777bd4a2a90
};
