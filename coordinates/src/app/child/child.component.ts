import { Component } from '@angular/core';
import { BoxService, Box } from '../box.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  selectedBox: Box | null = null;

  constructor(public boxService: BoxService){} 

  toggleBox(box: Box) {
    this.selectedBox = this.selectedBox === box ? null : box;
  }
  
  onDeleteBox(box: Box) {
    this.boxService.deleteBox(box);
  }
}
