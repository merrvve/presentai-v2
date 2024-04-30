import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent {
  public contactSent = false;
  public error = false;
  constructor(private contactService: ContactService) {}
  onSubmit(email: string) {
    this.contactSent = false;
    this.error = false;
    this.contactService.addNotify(email).subscribe(
      (result) => console.log((this.contactSent = true)),
      (error) => (this.error = true),
    );
  }
}
