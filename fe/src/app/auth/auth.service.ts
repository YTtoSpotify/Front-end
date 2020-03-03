import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login() {
    console.log("login triggered");
    const url = "http://localhost:5000/api/auth";
    const name = "spotify_login";
    const specs = "width=500,height=500";
    window.open(url, name, specs);

    // this.http.get("http://localhost:5000/api/auth").subscribe(data => {
    //   console.log(data);
    // });
  }
}
