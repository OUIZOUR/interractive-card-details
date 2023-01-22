import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent {
  name = 'JANE APPLESEED';
  number = '0000 0000 0000 0000';
  month = '00';
  year = '00';
  cvc = '000';

  errorNumber = '';
  errorName = '';
  errorDate = '';
  errorCvc = '';
  errorMessage = "Can't be blank";

  submitted = false;

  constructor() {}

  onName(e: any) {
    this.name = e.target.value;
  }

  onNumber(e: any) {
    const inputNumber = <HTMLInputElement>document.getElementById('number');
    let cardNumber =  e.target.value; // remove hyphens
    cardNumber = cardNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let splitNumber = cardNumber.match(/.{1,4}/g);
    if (splitNumber ) {
      inputNumber.value = splitNumber.join('-');
      this.number= splitNumber.join('-');
    }

    this.errorNumber = '';
    if (e.target.value && !/^(\d+-)*(\d+)$/.test(e.target.value)) {
      this.errorNumber = 'Wrong format, numbers only ';
    }

    if(!e.target.value){
      this.number = '0000 0000 0000 0000';
    }
  }

  onMonth(e: any) {
    this.month = e.target.value;
    if(!e.target.value){
      this.month = '00';
    }
  }

  onYear(e: any) {
    this.errorDate='';
    this.year = e.target.value;
    if(Number(this.year) > 12){
      this.errorDate="Year not valid"
    }
    if(!e.target.value){
      this.year = '00';
    }
  }

  onCVC(e: any) {
    this.cvc = e.target.value;
    if(!e.target.value){
      this.cvc = '000';
    }
  }

  onSubmit() {
    this.errorNumber = '';
    this.errorName = '';
    this.errorDate = '';
    this.errorCvc = '';

    const inputName = <HTMLInputElement>document.getElementById('name');
    const inputNumber = <HTMLInputElement>document.getElementById('number');
    const inputMonth = <HTMLInputElement>document.getElementById('month');
    const inputYear = <HTMLInputElement>document.getElementById('year');
    const inputCvc = <HTMLInputElement>document.getElementById('cvc');

    if (!inputName.value) {
      this.errorName = this.errorMessage;
    }

    if (!inputNumber.value) {
      this.errorNumber = this.errorMessage;
    }

    if(inputNumber.value.length !==19){
      this.errorNumber='Number incomplete'
    }

    if (!inputYear.value || !inputMonth.value) {
      this.errorDate = this.errorMessage;
    }


    if (!inputCvc.value) {
      this.errorCvc = this.errorMessage;
    }

    if (
      inputName.value &&
      inputNumber.value &&
      inputNumber.value.length ==19 &&
      inputYear.value &&
      Number(inputYear.value) <=12 &&
      inputMonth.value &&
      inputCvc.value
    ) {
      this.submitted = true;
    }
  }

  onContinue() {
    this.submitted = false;
    this.name = 'JANE APPLESEED';
    this.number = '0000 0000 0000 0000';
    this.month = '00';
    this.year = '00';
    this.cvc = '000';
    this.errorNumber = '';
    this.errorName = '';
    this.errorDate = '';
    this.errorCvc = '';
  }
}
