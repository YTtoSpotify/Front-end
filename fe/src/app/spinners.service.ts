import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SpinnersService {
  private individualChannelSpinner = new BehaviorSubject<string>(" ");
  private searchSpinner = new BehaviorSubject<boolean>(false);

  public fetchChannelsSpinner = new BehaviorSubject<boolean>(false);

  readonly individualChannelSpinner$ = this.individualChannelSpinner.asObservable();
  readonly searchSpinner$ = this.searchSpinner.asObservable();
  readonly fetchChannelsSpinner$ = this.fetchChannelsSpinner.asObservable();

  constructor() {}

  setIndividualSpinner(channelId: string) {
    this.individualChannelSpinner.next(channelId);
  }

  setSearchSpinner(isSearching: boolean) {
    this.searchSpinner.next(isSearching);
  }

  setFetchingSpinner(isFetching: boolean) {
    this.fetchChannelsSpinner.next(isFetching);
  }
}
