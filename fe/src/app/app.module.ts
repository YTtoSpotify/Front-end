import { HttpRequestInterceptor } from "./HttpRequestInterceptor.";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth/auth.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginButtonComponent } from "./reusable/auth/login-button/login-button.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginButtonComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
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
