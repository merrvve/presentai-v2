import { Component } from '@angular/core';
import { iPubmedResult } from '../../../models/iPubmedResult.interface';
import { PubmedService } from '../../../services/pubmed.service';

@Component({
  selector: 'app-pubmed-abstracts',
  templateUrl: './pubmed-abstracts.component.html',
  styleUrls: ['./pubmed-abstracts.component.scss']
})
export class PubmedAbstractsComponent {
  public isLoading: boolean = false;
  public isResult: boolean = false;
  public isError: boolean = false;
  public result: iPubmedResult = {
      total_abstracts: 0,
      downloaded_abstracts: 0,
      work_id: '',
      dict: '',
      image: ''
  };
  constructor(private pubmedService: PubmedService) {
  }
  onSubmit(query:string) {
    this.isLoading = true;
    this.isResult = false;
    this.isError = false;
    this.pubmedService.searchPubmed(query).subscribe(
      result => {
        this.isLoading = false;
        this.isResult = true;
        this.result = result;
        console.log(result)
      },
      error => {
        this.isError = true;
        window.alert(error)
      });
  }
  onDownload() {
    if (this.result.work_id == '') {
      window.alert('File not found.');
      return;
    }
    this.pubmedService.downloadFile(this.result.work_id).subscribe((response: Blob) => {
      
      const url = window.URL.createObjectURL(response);
      //const link = document.createElement('a');
      //link.href = url;
      const link = document.getElementById('downloadLink') as HTMLAnchorElement
      link.href = url
      link.setAttribute('download', 'abstracts.xlsx'); // replace 'file.extension' with your expected file name or extension
      link.click();
    },
      error => {
        window.alert(error)
      });
  }
}
