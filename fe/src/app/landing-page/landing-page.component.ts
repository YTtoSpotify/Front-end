import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe((data: any) => {
      this.router.navigate(["/dashboard"]);
    });
  }
}
