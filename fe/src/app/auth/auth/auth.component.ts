import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const url = "/home";
    window.opener.open(url, "_self");
    window.opener.focus();
    window.close();
  }
}
