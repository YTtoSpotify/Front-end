import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem("authenticated")) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
