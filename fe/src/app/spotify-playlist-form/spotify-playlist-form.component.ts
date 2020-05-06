import { NotyfFlashService } from "./../services/notyf.service";
import { UserService } from "./../services/user.service";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-spotify-playlist-form",
  templateUrl: "./spotify-playlist-form.component.html",
  styleUrls: ["./spotify-playlist-form.component.scss"],
})
export class SpotifyPlaylistFormComponent implements OnInit {
  public spotifyPlaylistName: string;
  constructor(
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private notyfService: NotyfFlashService
  ) {}

  ngOnInit() {}

  handleCreatePlaylist() {
    //   hit channels service method with spotifyPlaylistName
    this.userService
      .createUserSpotifyPlaylist(this.spotifyPlaylistName)
      .subscribe(
        (data) => {
          this.activeModal.dismiss();
          this.notyfService.successNotyf(data.message);
        },
        (err) => {
          this.notyfService.errorNotyf(err);
        }
      );
  }
}
