import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { UserService } from "./../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.userService.getUser();
  }

  handleLogout() {
    this.authService.logout().subscribe((data) => {
      this.authService.isAuthenticated = false;
      localStorage.removeItem("authenticated");
      this.router.navigate(["/"]);
    });
  }
}
