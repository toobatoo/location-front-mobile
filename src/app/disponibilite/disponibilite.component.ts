import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilite.component.html',
  styleUrls: ['./disponibilite.component.sass']
})
export class DisponibiliteComponent implements OnInit {

  month_parameter: any = 0;
  year_parameter: any = 0;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.month_parameter = this._route.snapshot.params['month'];
    this.year_parameter = this._route.snapshot.params['year'];
  }

}
