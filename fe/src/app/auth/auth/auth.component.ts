import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const url = "/home";
    window.opener.open(url, "_self");
    window.opener.focus();
    window.close();
  }

  onLogin() {
    this.authService.login();
  }
}
