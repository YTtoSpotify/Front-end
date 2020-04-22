import { ChannelsService } from "./../channels.service";
import { Component, OnInit } from "@angular/core";
import { Channel } from "../interfaces/channel.interface";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.scss"],
})
export class ChannelsComponent implements OnInit {
  public channels: Channel[];
  constructor(public channelsService: ChannelsService) {}

  ngOnInit() {
    this.channels = this.channelsService.channels;
  }
}
