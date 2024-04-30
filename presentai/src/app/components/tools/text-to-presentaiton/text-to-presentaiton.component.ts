import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { iShareTool } from '../../../models/iShareTool.interface';
import { iSlide } from '../../../models/iSlide.interface';
import { LogService } from '../../../services/log.service';
import { TextToPptxService } from '../../../services/text-to-pptx.service';

@Component({
  selector: 'app-text-to-presentaiton',
  templateUrl: './text-to-presentaiton.component.html',
  styleUrls: ['./text-to-presentaiton.component.scss'],
})
export class TextToPresentaitonComponent implements OnInit {
  public isLoading = false;
  public tool = 1;
  public isShow = false;
  public isError = false;
  public durum = '';
  public isCopied = false;
  public prompt =
    "You are a helpful assistant. Organise this text content into summarised slides for a coherent and engaging presentation.Your response should be in JSON object list for slides and each slide should be with properties 'title' and 'content'.The text is: ";
  public tooltoShare: iShareTool = {
    title: 'Text to .pptx Convertion Tool',
    link: 'text-to-pptx',
  };

  constructor(
    private textToPptx: TextToPptxService,
    private title: Title,
    private log: LogService,
  ) {
    this.isShow = false;
    this.durum = '';
  }
  ngOnInit() {
    this.title.setTitle('Presentai | Text to .pptx Conversion Tool');
  }

  onSubmit(text: string) {
    if (text == '') {
      this.isError = true;
      this.durum =
        'Sorry, the text input is empty. Please provide text content.';
      return;
    }
    this.isError = false;
    this.isShow = true;

    this.durum = 'Your file is being created... Please wait...';
    if (this.tool == 2) {
      try {
        JSON.parse(text) as iSlide[];
      } catch {
        this.durum =
          'Sorry, it is not a valid JSON. Please ask ChatGPT to correct this as a valid JSON object list.';
        this.isError = true;
        console.log(this.isError);
        return;
      }
    }
    if (this.tool == 1 || this.tool == 2) {
      this.isShow = false;
      this.textToPptx.createSlides(text, this.tool).subscribe( {
        next: (response: Blob) => {
          this.isShow = true;
          this.durum =
            'Your file is successfully created. The download will be started automatically. You can also download by clicking this button: ';

          const url = window.URL.createObjectURL(response);
          //const link = document.createElement('a');
          //link.href = url;
          let linkname = 'downloadLink' + String(this.tool);
          const link = document.getElementById(linkname) as HTMLAnchorElement;
          link.href = url;
          link.setAttribute('download', 'presentation.pptx'); // replace 'file.extension' with your expected file name or extension
          link.click();
          this.isError = false;
          return;
        },
        error: (error) => {
          this.isShow = true;
          this.isError = true;
          this.durum =
            'Sorry, an error occured. Please try again or contact to authors.';
          return;
        },
    });
    }

    if (this.tool == 3) {
      this.isLoading = true;
      this.isShow = false;
      this.textToPptx.createSlidesWithGPTautomated(text).subscribe(
       { 
        next: (response: any) => {
          this.isShow = true;
          this.durum =
            'Your file is successfully created. The download will be started automatically. You can also download by clicking this button: ';

          const url = window.URL.createObjectURL(response);
          //const link = document.createElement('a');
          //link.href = url;
          const link = document.getElementById(
            'downloadLink3',
          ) as HTMLAnchorElement;
          link.href = url;
          link.setAttribute('download', 'presentation.pptx'); // replace 'file.extension' with your expected file name or extension
          link.click();
          this.isError = false;
          this.isLoading=false;
          return;
        },
        error: (error) => {
          this.isShow = true;
          this.isError = true;
          this.isLoading=false;
          this.durum =
            'Sorry, an error occured. Please try again or contact to authors.';
          return;
        },
    });
    }

    this.log.addLog(this.tool, 3);
  }

  onTest(text:string) {
  this.textToPptx.testGPT(text).subscribe({
    next:(result)=> console.log(result),
    error:(error)=> console.log(error)
  })  
  }
}
