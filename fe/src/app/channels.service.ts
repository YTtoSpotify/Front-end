import { Channel } from "./interfaces/channel.interface";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ChannelsService {
  public channels: Channel[] = [
    { name: "Sleepy Wolf", photo: "../assets/sw.jpg" },
    { name: "Aminium Music", photo: "../assets/amin.jpg" },
  ];
  constructor() {}
}
