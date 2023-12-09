import { Component } from '@angular/core';
import { iTool } from '../../models/iTool.interface';
import { ToolsServiceService } from '../../services/tools-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public show = false;
  public tools : iTool[] = []
  constructor(private toolsService: ToolsServiceService) {
    this.tools = this.toolsService.tools;
  }
  ngAfterViewInit() {
    this.show = true;
  }
}
