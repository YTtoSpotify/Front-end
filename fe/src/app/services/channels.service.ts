import {
  ChannelsHttpResponse,
  FilterTypes,
  ChannelSpinnerEvent,
  ChannelSpinnerEvents,
} from "./../interfaces/channels.interface";
import { NotyfFlashService } from "./notyf.service";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Channel } from "../interfaces/channels.interface";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChannelsService {
  private channels = new BehaviorSubject<Channel[]>([]);
  private spinnerEvent = new BehaviorSubject<ChannelSpinnerEvent>({
    type: null,
  });
  private serverUrl = `${environment.serverUrl}/channels`;

  public totalChannelPages: number;
  public page: number;
  public totalChannelsCount: number;
  public nameFilter = "";
  public channelsObs$: Observable<Channel[]> = this.channels.asObservable();
  public spinnerEventObs$: Observable<
    ChannelSpinnerEvent
  > = this.spinnerEvent.asObservable();

  public;
  public channelFilter: FilterTypes = "available";

  constructor(
    private http: HttpClient,
    private notyfService: NotyfFlashService
  ) {}

  get isNextPage(): boolean {
    return this.page !== this.totalChannelPages;
  }

  get isPrevPage(): boolean {
    return this.page > 1;
  }

  get channelsArray(): Channel[] {
    return this.channels.getValue();
  }

  getChannels(page = 1) {
    const url =
      this.channelFilter === "user"
        ? `${this.serverUrl}/userChannels`
        : this.serverUrl;

    this.http
      .get<ChannelsHttpResponse>(url, {
        params: {
          page: page.toString(),
          nameFilter: this.nameFilter,
        },
      })
      .subscribe(
        (data) => {
          this.setChannelPaginationData(data);
          this.spinnerEvent.next({ type: null });
        },
        (err) => this.notyfService.errorNotyf(err)
      );
  }

  switchPage(direction: "next" | "prev") {
    if (direction === "next" && this.page < this.totalChannelPages) {
      this.getChannels(this.page + 1);
    } else if (direction === "prev" && this.page > 1) {
      this.getChannels(this.page - 1);
    }
  }

  public changeChannelUserSub(channelId: string) {
    let channels = this.channelsArray.map((channel) => {
      if (channel._id === channelId) channel.isUserSub = !channel.isUserSub;
      return channel;
    });

    if (this.channelFilter === "user") {
      channels = channels.filter((channel) => channel.isUserSub);
    }

    this.channels.next(channels);
  }

  public toggleUserChannelFilter(filter: FilterTypes) {
    this.channelFilter = filter;
  }

  public setSpinner(type: ChannelSpinnerEvents, channelId?: string) {
    this.spinnerEvent.next({ type, _id: channelId });
  }

  private setChannelPaginationData(paginationData: ChannelsHttpResponse) {
    this.channels.next(paginationData.channels);
    this.totalChannelPages = paginationData.numOfChannels;
    this.totalChannelPages = paginationData.totalPagesCount;
    this.page = paginationData.currentPage;
  }
}
