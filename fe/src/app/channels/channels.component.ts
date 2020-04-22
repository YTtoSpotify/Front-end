import { ChannelsService } from "../services/channels.service";
import { Component, OnInit } from "@angular/core";
import { Channel } from "../interfaces/channel.interface";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.scss"],
})
export class ChannelsComponent implements OnInit {
  constructor(public channelsService: ChannelsService) {}

  ngOnInit() {
    this.channelsService.getChannels();
  }
}
