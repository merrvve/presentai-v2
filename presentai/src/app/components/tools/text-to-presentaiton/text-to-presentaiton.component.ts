import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { iSlide } from '../../../models/iSlide.interface';
import { TextToPptxService } from '../../../services/text-to-pptx.service';

@Component({
  selector: 'app-text-to-presentaiton',
  templateUrl: './text-to-presentaiton.component.html',
  styleUrls: ['./text-to-presentaiton.component.scss']
})
export class TextToPresentaitonComponent implements OnInit {
  public tool = 1;
  public isShow = false;
  public isError = false;
  public durum = "";
  public isCopied = false;
  public prompt = "You are a helpful assistant. Organise this text content into summarised slides for a coherent and engaging presentation.Your response should be in JSON object list for slides and each slide should be with properties 'title' and 'content'.The text is: ";

  constructor(private textToPptx: TextToPptxService, private title: Title) {
    this.isShow = false;
    this.durum = "";
  }
  ngOnInit() {
    this.title.setTitle("Presentai | Text to .pptx Conversion Tool")
  }

  onSubmit(text: string) {
    this.isError = false;
    this.isShow = true;

    this.durum = "Your file is being created... Please wait..."
    if (this.tool == 2) {
      try {
        JSON.parse(text) as iSlide[];
      }
      catch {
        this.durum = "Sorry, it is not a valid JSON. Please ask ChatGPT to correct this as a valid JSON object list.";
        this.isError = true;
        console.log(this.isError)
        return;
      }
    }

    this.textToPptx.createSlides(text, this.tool).subscribe((response: Blob) => {
      this.isShow = true;
      this.durum = "Your file is successfully created. The download will be started automatically. You can also download by clicking this button: ";

      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'presentation.pptx'); // replace 'file.extension' with your expected file name or extension
      document.getElementById('downloadLink')?.appendChild(link);
      link.click();
    },
      error => {
        this.isShow = true;
        this.isError = true;
        this.durum="Sorry, an error occured. Please try again or contact to authors."
      })
  }
}
