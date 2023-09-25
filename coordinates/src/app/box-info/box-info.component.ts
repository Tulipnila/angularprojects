import { Component, Input, OnInit } from '@angular/core';
import { Box, BoxService } from '../box.service';

@Component({
  selector: 'app-box-info',
  templateUrl: './box-info.component.html',
  styleUrls: ['./box-info.component.css'],
})
export class BoxInfoComponent implements OnInit {
  @Input() box!: Box;
  @Input() isSelected: boolean = false;
  isHighlighted: boolean = false;

  constructor(private boxService: BoxService) {}

  ngOnInit() {
    this.boxService.getSelectedBox().subscribe((selectedBox) => {
      this.isSelected = selectedBox === this.box;
    });

    this.boxService.highlightedBox$.subscribe((highlightedBox) => {
      this.isHighlighted = highlightedBox === this.box; 
    });
  }

  onBoxClick() {
    this.isSelected = !this.isSelected;
    this.boxService.setSelectedBox(this.isSelected ? this.box : null);
    this.toggleHighlight();
  }
  onKeyDown(event: KeyboardEvent){
    if (event.key === 'Delete') {
      this.onDelete();
    }
  }
  onDelete() {
    this.boxService.deleteBox(this.box);
  }

  toggleHighlight() {
    this.boxService.toggleBoxHighlight(this.box);
  }
}
