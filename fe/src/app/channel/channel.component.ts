import { NotyfFlashService } from "./../services/notyf.service";
import { ChannelsService } from "./../services/channels.service";
import { UserService } from "./../services/user.service";
import { Channel } from "../interfaces/channels.interface";
import { Component, OnInit, Input } from "@angular/core";
import { finalize } from "rxjs/operators";

type DisplayIcons = "add" | "remove" | "processing";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.scss"],
})
export class ChannelComponent implements OnInit {
  @Input() channel: Channel;

  public iconType: DisplayIcons;

  constructor(
    private userService: UserService,
    private channelsService: ChannelsService,
    private notyfService: NotyfFlashService
  ) {}

  ngOnInit() {
    this.setIconType();
  }

  private setIconType() {
    this.channel.isUserSub
      ? (this.iconType = "remove")
      : (this.iconType = "add");
  }

  handleAddChannel() {
    this.iconType = "processing";
    this.userService
      .addChannelToUser(this.channel._id)
      .pipe(finalize(() => this.setIconType()))
      .subscribe(
        (data) => {
          this.channelsService.changeChannelUserSub(this.channel._id);
          this.notyfService.successNotyf(data.message);
        },
        (err) => this.notyfService.errorNotyf(err)
      );
  }

  handleRemoveChannel() {
    this.iconType = "processing";
    this.userService
      .deleteChannelFromUser(this.channel._id)
      .pipe(finalize(() => this.setIconType()))
      .subscribe(
        () => {
          this.channelsService.changeChannelUserSub(this.channel._id);
          this.notyfService.successNotyf("Channel removed.");
        },
        (err) => this.notyfService.errorNotyf(err)
      );
  }
}
