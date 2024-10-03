import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { Observable, map} from 'rxjs';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth:AuthService, private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
      return this.auth.appUser$.pipe(
      map((appUser: AppUser | null) => {
        if (appUser && appUser.isAdmin) {
          return true;
        } else {
          this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    )
  }
}
