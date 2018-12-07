import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking/booking.service';
import { BookingToServer } from './../models/bookingToServer.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import { MDCSelect } from '@material/select';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';


declare var $: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass']
})
export class BookingComponent implements OnInit {

  bookingList: BookingToServer[] = [];
  price: number = 0;
  checked: boolean = false;
  bookingForm: FormGroup;
  civilites: string[] = ['M.', 'Mme', 'Mlle'];
  public list;
  public listItemRipples;
  public select;
  public txtName;
  public txtFirstname;
  public txtMail;
  public txtAddress;
  public txtCp;
  public txtPhone;
  public showMail: boolean = false;

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.list = new MDCList(document.querySelector('.mdc-list'));
    this.listItemRipples = this.list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
    this.select = new MDCSelect(document.querySelector('.mdc-select'));
    /*this.select.listen('MDCSelect:change', () => {
      alert(`Selected option at index ${this.select.selectedIndex} with value "${this.select.value}"`);
    });*/
    this.txtName = new MDCTextField(document.querySelector('.txtName'));
    this.txtFirstname = new MDCTextField(document.querySelector('.txtFirstname'));
    this.txtMail = new MDCTextField(document.querySelector('.txtMail'));
    this.txtAddress = new MDCTextField(document.querySelector('.txtAddress'));
    this.txtCp = new MDCTextField(document.querySelector('.txtCp'));
    this.txtPhone = new MDCTextField(document.querySelector('.txtPhone'));

    this.bookingService.getInfosDatesFromServer()
      .subscribe(
        data => { this.bookingList = data; }
      );

    this.createForm();
  }

  createForm() {
    this.bookingForm = this.formBuilder.group({
      civilite: '',
      name: '',
      firstname: '',
      mail: '',
      address: '',
      cp: '',
      phone: ''
    });
  }

  submit() {
    //Tests price > 0 && fields are not empties && mail format && one date is checked
    if (this.price > 0) {
      if (this.validateEmail()) {
        let dataNotEmpties = false;
        for (var key in this.bookingForm.value) {

          if (this.bookingForm.value[key] == '') dataNotEmpties = false;
          else dataNotEmpties = true;
        }
        if (dataNotEmpties == false) alert('Veuillez remplir tous les champs!');
        else {
          let list_dates = [];
          for (let i = 0; i < this.bookingList.length; i++) {
            if (this.bookingList[i].type != 'OFF') list_dates.push(this.bookingList[i].id);
          }
          this.showMail = true;
          this.bookingService.sendForm(this.bookingForm.value, list_dates).subscribe(
            observer => this.showMail = false
          );
        }
      }
      else alert('Format de mail invalide!');
    }
    else alert('Veuillez sélectionner une période disponible.');
  }

  private validateEmail() {
    var reg = /\S+@\S+\.\S+/;
    return reg.test(this.bookingForm.value.mail);
  }

  checkedAll() {
    this.price = 0;
    this.checked = !this.checked;

    if (this.checked) {
      for (let i = 0; i < this.bookingList.length; i++) {
        if (this.bookingList[i].type != 'OFF')
          this.price += Number(this.bookingList[i].price);
      }
    }
    else this.price = 0;
  }

  dateIsChecked(event, booking) {
    if (event.target.checked) {
      this.price += Number(booking.price);
    }
    else
      this.price -= Number(booking.price);
  }

}
