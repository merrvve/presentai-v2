import { Component } from '@angular/core';
import { TextToPptxService } from '../../../services/text-to-pptx.service';

@Component({
  selector: 'app-text-to-presentaiton',
  templateUrl: './text-to-presentaiton.component.html',
  styleUrls: ['./text-to-presentaiton.component.scss']
})
export class TextToPresentaitonComponent {
  public tool = 1;
  public isShow = false;
  public durum = "";

  constructor(private textToPptx: TextToPptxService) {
    this.isShow = false;
    this.durum = "";
  }

  onSubmit(text: string) {
    this.isShow = true;
    this.durum = "Your file is being created... Please wait..."
    this.textToPptx.createSlides(text).subscribe(result => {
      this.isShow = true;
      this.durum = "Your file is successfully created. The download will be started automatically. You can also download by clicking this button: ";
    },
      error => {
        this.isShow = true;
        this.durum="Sorry, an error occured. Please try again or contact to authors."
      })
  }
}
