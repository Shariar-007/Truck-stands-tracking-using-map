import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './auth/login/login.component';
import {TruckStandsComponent} from './components/truck-stands/truck-stands.component';
import {BadUrlComponent} from './shared/components/bad-url/bad-url.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/common/auth.interceptor";
import {NavbarComponent} from './layouts/navbar/navbar.component';
// import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TruckStandsComponent,
    BadUrlComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatDialogModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB5rbSnFPSFIzBcQqmqWWpAUiiEXENA5BQ'
    // })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
