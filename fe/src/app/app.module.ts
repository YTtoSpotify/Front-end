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
import { RingLoaderModule } from "@bit/joshk.ng-spinners.ring-loader";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    LandingPageComponent,
    ChannelsComponent,
    ChannelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotyfModule,
    RingLoaderModule,
  ],
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
