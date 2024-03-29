import { finalize, tap } from 'rxjs/operators';
import { SpinnersService } from './../spinners.service';
import {
  ChannelsHttpResponse,
  FilterTypes,
} from './../interfaces/channels.interface';
import { NotyfFlashService } from './notyf.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Channel } from '../interfaces/channels.interface';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChannelsService {
  private channels = new BehaviorSubject<Channel[]>([]);
  private serverUrl = `${environment.serverUrl}/channels`;

  public totalChannelPages = 0;
  public page = 0;
  public totalChannelsCount = 0;
  public nameFilter = '';
  readonly channelsObs$: Observable<Channel[]> = this.channels.asObservable();

  public channelFilter: FilterTypes = 'available';

  constructor(
    private http: HttpClient,
    private notyfService: NotyfFlashService,
    private spinnersService: SpinnersService
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

  public getChannels(page = 1) {
    let pageNumber = page.toString();
    if (this.nameFilter) {
      this.spinnersService.setSearchSpinner(true);
      pageNumber = '1';
    }
    this.spinnersService.setFetchingSpinner(true);
    const url =
      this.channelFilter === 'user'
        ? `${this.serverUrl}/userChannels`
        : this.serverUrl;

    this.http
      .get<ChannelsHttpResponse>(url, {
        params: {
          page: pageNumber,
          nameFilter: this.nameFilter,
        },
      })
      .pipe(
        tap(() => {}),
        finalize(() => {
          this.spinnersService.setSearchSpinner(false);
          this.spinnersService.setFetchingSpinner(false);
        })
      )
      .subscribe(
        (data) => {
          this.setChannelPaginationData(data);
        },
        (err) => this.notyfService.errorNotyf(err)
      );
  }

  public createChannel(channelUrl: string) {
    return this.http.post<ChannelsHttpResponse>(
      `${this.serverUrl}/createChannel`,
      {
        channelUrl,
      }
    );
  }

  public switchPage(direction: 'next' | 'prev') {
    if (direction === 'next' && this.page < this.totalChannelPages) {
      this.getChannels(this.page + 1);
    } else if (direction === 'prev' && this.page > 1) {
      this.getChannels(this.page - 1);
    }
  }

  public changeChannelUserSub(channelId: string) {
    let channels = this.channelsArray.map((channel) => {
      if (channel._id === channelId) channel.isUserSub = !channel.isUserSub;
      return channel;
    });

    if (this.channelFilter === 'user') {
      channels = channels.filter((channel) => channel.isUserSub);
    }

    this.channels.next(channels);
  }

  public toggleUserChannelFilter(filter: FilterTypes) {
    this.channelFilter = filter;
  }

  public clearNameFilter() {
    this.nameFilter = '';
  }
  public setChannelPaginationData(paginationData: ChannelsHttpResponse) {
    this.channels.next(paginationData.channels);
    this.totalChannelPages = paginationData.numOfChannels;
    this.totalChannelPages = paginationData.totalPagesCount;
    this.page = paginationData.currentPage;
  }
}
