import { NotyfService } from "ng-notyf";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class NotyfFlashService {
  constructor(private notyf: NotyfService) {}

  successNotyf(message: string) {
    this.notyf.toastContainerStyle = { left: "0" };

    this.notyf.success(message);
  }

  errorNotyf(error: HttpErrorResponse) {
    this.notyf.toastContainerStyle = { left: "40%" };

    const message =
      error.error.message || `${error.status} ${error.statusText}`;

    this.notyf.error(message);
  }
}
