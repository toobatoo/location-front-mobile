import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { DisponibiliteComponent } from './disponibilite/disponibilite.component';
import { TarifComponent } from './tarif/tarif.component';
import { CardComponent } from './card/card.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { BookingComponent } from './booking/booking.component';
import { MapComponent } from './map/map.component';
import { DescriptionComponent } from './description/description.component';
import { PhotoComponent } from './photo/photo.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    DisponibiliteComponent,
    TarifComponent,
    CardComponent,
    CalendarComponent,
    DayComponent,
    BookingComponent,
    MapComponent,
    DescriptionComponent,
    PhotoComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATwVboVqZVsCDrHDzoRRVZqqcV-OhwqMA'
    }),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
