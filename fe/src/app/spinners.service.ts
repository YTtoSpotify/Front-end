import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SpinnersService {
  private individualChannelSpinner = new BehaviorSubject<string>(" ");

  //   TODO continue refactoring channels service spinner logic into this
  public fetchChannelsSub$ = new Subject();
  public searchChannelsSub$ = new Subject();

  readonly individualChannelSpinnerSub$ = this.individualChannelSpinner.asObservable();
  constructor() {}

  setIndividualSpinner(channelId: string) {
    this.individualChannelSpinner.next(channelId);
  }
}
