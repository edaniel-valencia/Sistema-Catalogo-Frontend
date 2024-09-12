import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  Uname: string = '';
  Ulastname: string = '';
  Uemail: string = '';
  Upassword: string = '';
  Ucredential: string = '';
  repeatUPassword: string = '';
  loading: boolean = false;
}
