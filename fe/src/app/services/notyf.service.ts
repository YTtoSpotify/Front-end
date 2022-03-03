import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotyfFlashService {
  constructor() {}

  successNotyf(message: string) {}

  errorNotyf(error: HttpErrorResponse) {}
}
