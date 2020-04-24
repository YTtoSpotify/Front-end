import { ChannelsService } from "./channels.service";
import { BehaviorSubject } from "rxjs";
import { NotyfFlashService } from "./notyf.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private serverUrl = `${environment.serverUrl}/user`;

  private userBS = new BehaviorSubject<User>({} as User);

  public userObs$ = this.userBS.asObservable();

  constructor(
    private http: HttpClient,
    private notyfService: NotyfFlashService,
    private channelsService: ChannelsService
  ) {}

  get user() {
    return this.userBS.getValue();
  }

  addChannelToUser(channelId: string) {
    this.http
      .put<{ message: string }>(`${this.serverUrl}/addChannel/${channelId}`, {})
      .subscribe(
        (data) => {
          this.channelsService.changeChannelUserSub(channelId);
          this.notyfService.successNotyf(data.message);
        },
        (err) => this.notyfService.errorNotyf(err)
      );
  }

  getUser() {
    this.http.get<User>(this.serverUrl).subscribe(
      (user) => {
        this.userBS.next(user);
      },
      (err) => this.notyfService.errorNotyf(err)
    );
  }

  deleteChannelFromUser(channelId) {
    this.http
      .delete<{ message: string }>(
        `${this.serverUrl}/deleteChannel/${channelId}`
      )
      .subscribe(
        () => {
          this.channelsService.changeChannelUserSub(channelId);
          this.notyfService.successNotyf("Channel removed.");
        },
        (err) => this.notyfService.errorNotyf(err)
      );
  }
}
