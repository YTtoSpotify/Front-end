import { UserService } from "./../services/user.service";
import { Channel } from "./../interfaces/channel.interface";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.scss"],
})
export class ChannelComponent implements OnInit {
  @Input() channel: Channel;
  constructor(private userService: UserService) {}

  ngOnInit() {}

  handleAddChannel() {
    this.userService.addChannelToUser(this.channel._id);
  }

  handleRemoveChannel() {
    this.userService.deleteChannelFromUser(this.channel._id);
  }
}
