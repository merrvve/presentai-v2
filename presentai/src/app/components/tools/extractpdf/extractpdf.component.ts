import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { iShareTool } from '../../../models/iShareTool.interface';
import { PdfExtractionService } from '../../../services/pdf-extraction.service';

@Component({
  selector: 'app-extractpdf',
  templateUrl: './extractpdf.component.html',
  styleUrls: ['./extractpdf.component.scss'],
})
export class ExtractpdfComponent implements OnInit {
  public text: string = '';
  public isResult: boolean = false;
  public isCopied = false;
  public isLoading: boolean = false;
  public tool: iShareTool = {
    title: 'Extract Text and Images From PDF Files',
    link: 'extract-pdf',
  };
  constructor(
    public pdfService: PdfExtractionService,
    private title: Title,
  ) {}

  ngOnInit() {
    this.title.setTitle('Presentai | Extract Text and Images From PDF Files');
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.isResult = false;
    this.isLoading = true;
    if (file) {
      const extension = file.name.split('.').pop();
      if (extension) {
        if (extension.toLowerCase() === 'pdf') {
          this.extractPdf(file);
        } else {
          this.text = 'File is not a PDF.';
          this.isLoading = false;
        }
      }
    }
  }
  onFileDropped(file: File) {
    this.extractPdf(file);
  }

  extractPdf(file: File) {
    if (file.size > 10097152) {
      window.alert('Sorry, This file is too big.');
    } else {
      this.isResult = false;
      this.isLoading = true;
      this.pdfService.extractText(file).then((text: string) => {
        this.pdfService.text = text;
        this.text = text;
        this.isResult = true;
        this.isLoading = false;
      });
    }
  }
}
