import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments';
import { iShareTool } from '../../models/iShareTool.interface';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  public isLike = false;
  public isShare = false;
  public desc: string = ""
  public url = environment.url;
  @Input() tool: iShareTool | undefined;
  ngOnInit() {
    if (this.tool?.title) {
      this.desc = encodeURIComponent(this.tool.title);
    } else {
      // Handle the case where this.tool?.title is undefined
      this.desc = ""; // or some default value
    }

  }
}
