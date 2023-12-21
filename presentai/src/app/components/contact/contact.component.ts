import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public contactSent = false;
  public error = false;
  constructor(private contactService: ContactService) { }
  onSubmit(email: string, text: string) {
    this.contactSent = false;
    this.error = false;
    this.contactService.addContact(email, text).subscribe(result => console.log(this.contactSent = true), error => this.error = true);
  }
}
