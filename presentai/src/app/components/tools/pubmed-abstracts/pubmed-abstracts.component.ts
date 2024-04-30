import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { iPubmedResult } from '../../../models/iPubmedResult.interface';
import { iShareTool } from '../../../models/iShareTool.interface';
import { LogService } from '../../../services/log.service';
import { PubmedService } from '../../../services/pubmed.service';

@Component({
  selector: 'app-pubmed-abstracts',
  templateUrl: './pubmed-abstracts.component.html',
  styleUrls: ['./pubmed-abstracts.component.scss'],
})
export class PubmedAbstractsComponent implements OnInit {
  public isLoading: boolean = false;
  public isResult: boolean = false;
  public isError: boolean = false;
  public tool: iShareTool = {
    title: 'Pubmed Batch Abstract Download Tool',
    link: 'pubmed-abstracts',
  };

  public result: iPubmedResult = {
    total_abstracts: 0,
    downloaded_abstracts: 0,
    work_id: '',
    dict: '',
    image: '',
  };
  constructor(
    private pubmedService: PubmedService,
    private title: Title,
    private log: LogService,
  ) {}

  ngOnInit() {
    this.title.setTitle('Presentai | Pubmed Batch Abstract Download Tool');
  }

  onSubmit(query: string) {
    this.isLoading = true;
    this.isResult = false;
    this.isError = false;
    this.pubmedService.searchPubmed(query).subscribe( {
    next:(result) => {
        this.isLoading = false;
        this.isResult = true;
        this.result = result;
        console.log(result);
      },
      error:(error) => {
        this.isError = true;
        window.alert(error);
      },
  });
    this.log.addLog(5, 3);
  }
  onDownload() {
    if (this.result.work_id == '') {
      window.alert('File not found.');
      return;
    }
    this.pubmedService.downloadFile(this.result.work_id).subscribe( {
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        //const link = document.createElement('a');
        //link.href = url;
        const link = document.getElementById(
          'downloadLink',
        ) as HTMLAnchorElement;
        link.href = url;
        link.setAttribute('download', 'abstracts.xlsx'); // replace 'file.extension' with your expected file name or extension
        link.click();
      },
      error: (error) => {
        window.alert(error);
      },
  });
  }
}
