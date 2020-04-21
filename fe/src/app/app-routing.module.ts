import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginButtonComponent } from "./reusable/auth/login-button/login-button.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { AuthGuardService } from "./services/auth-guard-service.service";

const routes: Routes = [
  {
    path: "authenticate",
    component: AuthComponent,
  },
  {
    path: "dashboard",
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "",
    component: LandingPageComponent,
  },
  {
    path: "login",
    component: LoginButtonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
