import { SpinnersService } from "./../spinners.service";
import { ChannelsService } from "./channels.service";
import { BehaviorSubject } from "rxjs";
import { NotyfFlashService } from "./notyf.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { finalize } from "rxjs/operators";
import { ChannelSpinnerEvents } from "../interfaces/channels.interface";

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
    private channelsService: ChannelsService,
    private spinnersService: SpinnersService
  ) {}

  get user() {
    return this.userBS.getValue();
  }

  addChannelToUser(channelId: string) {
    this.spinnersService.setIndividualSpinner(channelId);
    this.http
      .put<{ message: string }>(`${this.serverUrl}/addChannel/${channelId}`, {})
      .pipe(finalize(() => this.spinnersService.setIndividualSpinner(" ")))
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

  deleteChannelFromUser(channelId: string) {
    this.spinnersService.setIndividualSpinner(channelId);

    this.http
      .delete<{ message: string }>(
        `${this.serverUrl}/deleteChannel/${channelId}`
      )
      .pipe(
        finalize(() => {
          this.spinnersService.setIndividualSpinner(" ");
        })
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
