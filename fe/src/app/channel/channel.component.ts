import { NotyfFlashService } from './../services/notyf.service';
import { SpinnersService } from './../spinners.service';
import { ChannelsService } from './../services/channels.service';
import { UserService } from './../services/user.service';
import { Channel } from '../interfaces/channels.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  @Input() channel?: Channel;

  constructor(
    private userService: UserService,
    public channelsService: ChannelsService,
    public spinnersService: SpinnersService,
    private notyyFlashService: NotyfFlashService
  ) {}

  ngOnInit() {}

  handleAddChannel() {
    if (!this.userService.user.hasPlaylist) {
      this.userService.createUserSpotifyPlaylist().subscribe({
        next: (data) => {
          if (!this.channel) return;

          this.userService.addChannelToUser(this.channel._id);
        },
        error: (err) => {
          this.notyyFlashService.errorNotyf(err);
        },
      });
    } else {
      if (!this.channel) return;

      this.userService.addChannelToUser(this.channel._id);
    }
  }

  handleRemoveChannel() {
    if (!this.channel) return;

    this.userService.deleteChannelFromUser(this.channel._id);
  }
}
