import { Injectable, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  MatDialogModule,
} from "@angular/material/dialog";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import * as Hammer from "hammerjs";
import {
  HammerModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, MatDialogModule, HammerModule],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
