import { UserService } from "./../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.getUser();
  }
}
