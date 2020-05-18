import { NotyfFlashService } from "./../services/notyf.service";
import { ChannelsService } from "./../services/channels.service";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-channel",
  templateUrl: "./add-channel.component.html",
  styleUrls: ["./add-channel.component.scss"],
})
export class AddChannelComponent implements OnInit {
  public channelUrl: string;
  public isAdding = false;
  constructor(
    private channelsService: ChannelsService,
    private notyfService: NotyfFlashService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  handleAddChannel() {
    this.isAdding = true;
    this.channelsService.createChannel(this.channelUrl).subscribe(
      (data) => {
        this.channelsService.setChannelPaginationData(data);
        this.notyfService.successNotyf("Channel added successfully!");
        this.activeModal.close();
      },
      (err) => {
        this.activeModal.close();
        this.notyfService.errorNotyf(err);
      }
    );
  }
}
