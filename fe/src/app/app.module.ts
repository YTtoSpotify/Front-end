import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpRequestInterceptor } from "./HttpRequestInterceptor.";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth/auth.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { ChannelsComponent } from "./channels/channels.component";
import { ChannelComponent } from "./channel/channel.component";
import { FormsModule } from "@angular/forms";
import { NotyfModule } from "ng-notyf";

import { SpotifyPlaylistFormComponent } from "./spotify-playlist-form/spotify-playlist-form.component";
import { RingSpinnerComponent } from "./reusable/ring-spinner/ring-spinner.component";
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    LandingPageComponent,
    ChannelsComponent,
    ChannelComponent,
    SpotifyPlaylistFormComponent,
    RingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NotyfModule,
  ],
  entryComponents: [SpotifyPlaylistFormComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
