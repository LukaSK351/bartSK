import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/gallery-list/main.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { DndDirective } from './directives/dnd.directive';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllComponent } from './components/header/all.component';
import { TheImageComponent } from './components/the-image/the-image.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MatDialogComponent,
    ImageListComponent,
    DndDirective,
    AllComponent,
    TheImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
