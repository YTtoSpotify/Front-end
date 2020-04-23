import { NotyfFlashService } from "./notyf.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private serverUrl = `${environment.serverUrl}/user`;

  constructor(
    private http: HttpClient,
    private notyfService: NotyfFlashService
  ) {}

  addChannelToUser(channelId) {
    this.http
      .put<{ message: string }>(`${this.serverUrl}/addChannel/${channelId}`, {})
      .subscribe(
        (data) => this.notyfService.successNotyf(data.message),
        (err) => this.notyfService.errorNotyf(err)
      );
  }

  deleteChannelFromUser(channelId) {
    this.http
      .delete<{ message: string }>(
        `${this.serverUrl}/deleteChannel/${channelId}`
      )
      .subscribe(
        (data) => this.notyfService.successNotyf("Channel removed."),
        (err) => this.notyfService.errorNotyf(err)
      );
  }
}
