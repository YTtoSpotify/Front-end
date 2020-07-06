import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem("authenticated")) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
