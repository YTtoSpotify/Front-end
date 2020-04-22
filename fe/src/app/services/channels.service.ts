import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Channel } from "../interfaces/channel.interface";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChannelsService {
  private channels = new BehaviorSubject<Channel[]>([]);
  private serverUrl = `${environment.serverUrl}/channels`;

  public channelsObs$: Observable<Channel[]> = this.channels.asObservable();

  constructor(private http: HttpClient) {}

  getAllChannels() {
    this.http.get(this.serverUrl).subscribe((channels: Channel[]) => {
      this.channels.next(channels);
    });
  }
}
