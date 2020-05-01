import { SpotifyPlaylistFormComponent } from "./../spotify-playlist-form/spotify-playlist-form.component";
import { SpinnersService } from "./../spinners.service";
import { ChannelsService } from "./../services/channels.service";
import { UserService } from "./../services/user.service";
import { Channel } from "../interfaces/channels.interface";
import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.scss"],
})
export class ChannelComponent implements OnInit {
  @Input() channel: Channel;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    public channelsService: ChannelsService,
    public spinnersService: SpinnersService
  ) {}

  ngOnInit() {}

  handleAddChannel() {
    if (!this.userService.user.hasPlaylist) {
      this.modalService.open(SpotifyPlaylistFormComponent, {
        beforeDismiss: () => {
          this.userService.addChannelToUser(this.channel._id);
          return true;
        },
      });
    }
  }

  handleRemoveChannel() {
    this.userService.deleteChannelFromUser(this.channel._id);
  }
}
