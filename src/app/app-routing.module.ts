import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisponibiliteComponent } from './disponibilite/disponibilite.component';
import { TarifComponent } from './tarif/tarif.component';
import { BookingComponent } from './booking/booking.component';
import { MapComponent } from './map/map.component';
import { DescriptionComponent } from './description/description.component';
import { PhotoComponent } from './photo/photo.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'disponibilites/:month/:year', component: DisponibiliteComponent },
  { path: 'tarif', component: TarifComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'map', component: MapComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'photos', component: PhotoComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
