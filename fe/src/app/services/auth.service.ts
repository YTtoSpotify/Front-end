import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isLoggedIn: boolean;
  constructor(private http: HttpClient) {}

  login() {
    const url = "http://localhost:5000/api/auth";
    const name = "spotify_login";
    const specs = "width=500,height=500";
    window.open(url, name, specs);
  }

  checkAuth() {
    return this.http
      .get("http://localhost:5000/api/auth/checkAuth")
      .subscribe((data: { isLoggedIn: boolean }) => {
        this.isLoggedIn = data.isLoggedIn;
        console.log(this.isLoggedIn);
      });
  }
}
