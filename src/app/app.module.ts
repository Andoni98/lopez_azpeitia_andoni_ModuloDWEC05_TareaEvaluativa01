import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { JuegoComponent } from './juego/juego.component'; 

@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }