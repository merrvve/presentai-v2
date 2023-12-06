import { Component } from '@angular/core';
import { PdfExtractionService } from '../../../services/pdf-extraction.service';

@Component({
  selector: 'app-extractpdf',
  templateUrl: './extractpdf.component.html',
  styleUrls: ['./extractpdf.component.scss']
})
export class ExtractpdfComponent {
  public text: string = "";
  public isResult: boolean = false;
  public isCopied = false;
  public isLike = false;
  public isShare = false;
  constructor(public pdfService: PdfExtractionService) {

  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop();

      if (extension) {
        if (extension.toLowerCase() === 'pdf') {
          // It's a PDF file, continue processing
          console.log('File is a PDF.');
          this.pdfService.extractText(file)
            .then((text: string) => {
              console.log(text);

              this.pdfService.text = text;
              this.text = text;
              this.isResult = true;
             // this.userTextInputs.push({ id: this.inputId, text: text });
             // this.addChat(true, { id: this.inputId, text: text });
             // this.inputId += 1;

            });
        } else {
          // File has the wrong extension, handle as needed
          console.log('File is not a PDF.');
        }
      }
    }
  }

  
}
