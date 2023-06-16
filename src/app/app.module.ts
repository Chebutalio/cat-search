import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from "@ngxs/store";
import { CatListComponent } from './cat-list/cat-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CatService } from "./services/cat.service";
import { CatsState } from "./store/cat.state";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { CatCardComponent } from './cat-card/cat-card.component';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    CatListComponent,
    CatCardComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    NgxsModule.forRoot([
      CatsState
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [
    CatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
