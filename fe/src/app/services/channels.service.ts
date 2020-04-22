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
  private totalChannelPages: number;
  private serverUrl = `${environment.serverUrl}/channels`;

  public page: number;
  public totalChannelsCount: number;
  public nameFilter = "";
  public channelsObs$: Observable<Channel[]> = this.channels.asObservable();

  constructor(private http: HttpClient) {}

  getChannels(page = 1) {
    this.http
      .get<{
        channels: Channel[];
        currentPage: number;
        numOfChannels: number;
        pages: number;
      }>(this.serverUrl, {
        params: {
          page: page.toString(),
          nameFilter: this.nameFilter,
        },
      })
      .subscribe((data) => {
        this.channels.next(data.channels);
        this.totalChannelPages = data.numOfChannels;
        this.totalChannelPages = data.pages;
        this.page = data.currentPage;
      });
  }

  switchPage(direction: "next" | "prev") {
    if (direction === "next" && this.page < this.totalChannelPages) {
      this.getChannels(this.page + 1);
    } else if (direction === "prev" && this.page > 1) {
      this.getChannels(this.page - 1);
    }
  }
}
