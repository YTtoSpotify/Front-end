import { SpinnersService } from "./../spinners.service";
import { ChannelsService } from "./../services/channels.service";
import { UserService } from "./../services/user.service";
import {
  Channel,
  ChannelSpinnerEvents,
} from "../interfaces/channels.interface";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.scss"],
})
export class ChannelComponent implements OnInit {
  @Input() channel: Channel;

  public spinnerTypeEnums = ChannelSpinnerEvents;

  constructor(
    private userService: UserService,
    public channelsService: ChannelsService,
    public spinnersService: SpinnersService
  ) {}

  ngOnInit() {}

  handleAddChannel() {
    this.userService.addChannelToUser(this.channel._id);
  }

  handleRemoveChannel() {
    this.userService.deleteChannelFromUser(this.channel._id);
  }
}
