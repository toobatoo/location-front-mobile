import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarifService } from '../services/tarif/tarif.service';
import { Tarif } from '../models/Tarif.interface';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.sass']
})
export class TarifComponent implements OnInit {
  openMenu: boolean = false;
  listTarifs: Tarif[] = [];
  listMonths: string[];
  year: number;

  constructor(private router: Router, private tarifService: TarifService) {
    this.listMonths = ['MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE'];
  }

  ngOnInit() {

    this.tarifService.getPricesAndMonths().subscribe(
      (observer) => {
        this.listTarifs = observer;
        this.year = observer[0].year;
      }
    );
  }

  goDisponibilites(month) {
    var router = this.router;
    var year = this.year;
    router.navigateByUrl('disponibilites/' + month + '/' + year);
  }
}
