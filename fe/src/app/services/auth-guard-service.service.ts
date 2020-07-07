import { AuthService } from "./auth.service";
import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    this.authService.checkAuth().subscribe(
      (res: any) => {
        return true;
      },
      (err) => {
        this.router.navigate([""]);
        return false;
      }
    );
    return true;
  }
}
