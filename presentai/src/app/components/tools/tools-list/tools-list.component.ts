import { Component, Input } from '@angular/core';
import { iTool } from '../../../models/iTool.interface';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss'],
})
export class ToolsListComponent {
  @Input() tools: iTool[] = [];
  public filterInput: string = '';
  public limit: number = 5;
  constructor() {}

  seeAll() {
    this.limit = this.tools.length;
  }

  expand() {
    this.limit = 10;
  }
}
