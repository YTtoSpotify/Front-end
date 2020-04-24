import {
  FilterTypes,
  ChannelSpinnerEvents,
} from "./../interfaces/channels.interface";
import { ChannelsService } from "../services/channels.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.scss"],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  private inputEventSub: Subscription;
  public nameFilter: string;

  @ViewChild("channelSearchInput", { static: true })
  channelSearchInput: ElementRef;
  constructor(public channelsService: ChannelsService) {}

  ngOnInit() {
    this.channelsService.getChannels();

    this.nameFilter = this.channelsService.nameFilter;

    this.inputEventSub = fromEvent(
      this.channelSearchInput.nativeElement,
      "keyup"
    )
      .pipe(
        //  get value of input
        map((event: any) => {
          return event.target.value;
        }),
        // wait x milliseconds between key event to make request
        debounceTime(500),
        // if current query is different that previous query
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.channelsService.setSpinner(ChannelSpinnerEvents.SEARCHCHANNELS);
        this.channelsService.getChannels(this.channelsService.page);
      });
  }

  handleUserChannelFilter(filter: FilterTypes) {
    this.channelsService.toggleUserChannelFilter(filter);
    this.channelsService.getChannels();
  }

  ngOnDestroy() {
    this.inputEventSub.unsubscribe();
  }
}
