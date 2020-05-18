import { NotyfFlashService } from "./../services/notyf.service";
import { ChannelsService } from "./../services/channels.service";
import { Component, OnInit } from "@angular/core";
import { isValidYTUrl } from "../reusable/youtubeUrlValidator";

@Component({
  selector: "app-add-channel",
  templateUrl: "./add-channel.component.html",
  styleUrls: ["./add-channel.component.scss"],
})
export class AddChannelComponent implements OnInit {
  public channelUrl: string;
  constructor(
    private channelsService: ChannelsService,
    private notyfService: NotyfFlashService
  ) {}

  ngOnInit() {}

  handleAddChannel() {
    if (isValidYTUrl(this.channelUrl)) {
      this.channelsService.createChannel(this.channelUrl).subscribe(
        (data) => {
          this.channelsService.setChannelPaginationData(data);
          this.notyfService.successNotyf("Channel added successfully!");
        },
        (err) => {
          this.notyfService.errorNotyf(err);
        }
      );
    }
  }
}
