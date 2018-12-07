import { Component, OnInit } from '@angular/core';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { ContactService } from '../services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  public textNom;
  public textPrenom;
  public textMail;
  public textMsg;
  public btnSend;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.textNom = new MDCTextField(document.querySelector('.txt-nom'));
    this.textPrenom = new MDCTextField(document.querySelector('.txt-prenom'));
    this.textMail = new MDCTextField(document.querySelector('.txt-mail'));
    this.textMsg = new MDCTextField(document.querySelector('.txt-msg'));
    this.btnSend = new MDCRipple(document.querySelector('.btn-send'));
  }

  submit(nom, prenom, mail, msg) {
    if (!this.validateEmail(mail.value)) { alert('Mail invalide!'); return false; }
    if (this.isValid(nom.value, prenom.value, mail.value, msg.value)) {
      this.contactService.sendMail(nom.value, prenom.value, mail.value, msg.value).subscribe(
        observer => alert('Mail envoyé!'),
        error => alert('Une erreur est survenu!')
      );
    }
  }

  private validateEmail(mail) {
    var reg = /\S+@\S+\.\S+/;
    return reg.test(mail);
  }

  private isValid(nom, prenom, mail, msg) {
    if (nom != '' && prenom != '' && mail != '' && this.validateEmail(mail) && msg != '')
      return true;
    else return false;
  }
}
