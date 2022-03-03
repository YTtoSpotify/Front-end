import { SpinnersService } from './../spinners.service';
import { FilterTypes } from './../interfaces/channels.interface';
import { ChannelsService } from '../services/channels.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddChannelComponent } from '../add-channel/add-channel.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  public nameFilter = '';

  private inputEventSub?: Subscription;
  private modalRef?: NgbModalRef;
  @ViewChild('channelSearchInput', { static: true })
  private channelSearchInput?: ElementRef;

  constructor(
    public channelsService: ChannelsService,
    public spinnersService: SpinnersService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.channelsService.getChannels();

    this.inputEventSub = fromEvent(
      this.channelSearchInput?.nativeElement,
      'keyup'
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
        this.channelsService.getChannels(this.channelsService.page);
      });
  }

  handleUserChannelFilter(filter: FilterTypes) {
    this.channelsService.toggleUserChannelFilter(filter);
    this.channelsService.getChannels();
  }

  handleClearName() {
    this.channelsService.clearNameFilter();
    this.channelsService.getChannels();
  }

  openAddChannelModal() {
    //   open modal
    this.modalRef = this.modalService.open(AddChannelComponent);
    // send create request with url
  }
  ngOnDestroy() {
    this.inputEventSub?.unsubscribe();
  }
}
