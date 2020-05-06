import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-ring-spinner",
  templateUrl: "./ring-spinner.component.html",
  styleUrls: ["./ring-spinner.component.scss"],
})
export class RingSpinnerComponent implements OnInit {
  @Input() stylesObject;

  constructor() {}

  ngOnInit() {}
}
