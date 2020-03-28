import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  login() {
    // route to server login endpoint
    const url = "http://localhost:5000/api/auth";
    const name = "spotify_login";
    const specs = "width=500,height=500";

    // open popup window for login
    window.open(url, name, specs);
  }

  checkAuth() {
    return this.http
      .get("http://localhost:5000/api/auth/checkAuth")
      .subscribe((data: { isAuthenticated: boolean }) => {
        this.isAuthenticated.next(data.isAuthenticated);
      });
  }
}
