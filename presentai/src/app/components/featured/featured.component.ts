import { Component, Input } from '@angular/core';
import { iTool } from '../../models/iTool.interface';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent {
  @Input() tools: iTool[] = [];
}
