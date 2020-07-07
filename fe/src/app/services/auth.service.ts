import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private serverUrl = `${environment.serverUrl}/auth`;
  constructor(private http: HttpClient) {}

  login() {
    // route to server login endpoint
    const name = "spotify_login";
    const specs = "width=500,height=500";

    // open popup window for login
    window.open(this.serverUrl, name, specs);
  }

  logout() {
    return this.http.get(`${this.serverUrl}/logout`);
  }

  checkAuth() {
    return this.http.get(`${this.serverUrl}/checkAuth`);
    // .subscribe((data: { isAuthenticated: boolean }) => {
    //   this.isAuthenticated = data.isAuthenticated;
    //   localStorage.setItem("authenticated", `${data.isAuthenticated}`);
    // });
  }
}
