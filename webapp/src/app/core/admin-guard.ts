import { CanActivateFn, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication-service/authentication.service";
import { inject } from "@angular/core";


export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);
    if (authService.isLoggedIn) {
        if (authService.isAdmin) {
            return true;
        } else {
            router.navigate(['/']);
            return false;
        }
    } else {
        router.navigate(['/login']);
        return false;
    }
}