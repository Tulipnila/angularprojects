import { Component } from '@angular/core';
import { BoxService, Box } from '../box.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  selectedBox:Box | null = null;

  constructor(
    public boxService: BoxService,
    private route: ActivatedRoute,
    private router: Router 
  ) {
    this.boxService.highlightedBox$.subscribe((highlightedBox) => {
      this.selectedBox = highlightedBox;
    });

    this.route.queryParams.subscribe((params) => {
      if (params['x'] && params['y']) {
        const x = parseInt(params['x'], 10);
        const y = parseInt(params['y'], 10);
        this.selectedBox = this.findBoxByCoordinates(x, y);
      } else {
        this.selectedBox = null;
      }
    });
  }


  onDoubleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const container = document.querySelector('.box-container') as HTMLElement;
    const containerRect = container.getBoundingClientRect();
    const boxSize = 10;

    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

   if (x < 0 || y < 0 || x + boxSize > containerRect.width || y + boxSize > containerRect.height) {
      return;
    }

    const newBox: Box = { x, y, size: boxSize }; // Include 'size' property here

    /*if (this.checkOverlapping(newBox, this.boxService.getBoxes())) {
      return;
    }*/

    this.boxService.addBoxes(newBox);
   
  }
  onBoxDoubleClick(event: MouseEvent){
    event.preventDefault();
    event.stopPropagation();
  }
  onDeleteBox(box: Box) {
    this.boxService.deleteBox(box);
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete' && this.selectedBox) {
      this.onDeleteBox(this.selectedBox);
    }
  }

  /*checkOverlapping(newBox: Box, boxes: Box[]): boolean {
    for (const box of boxes) {
      const isOverlappingX = newBox.x + newBox.size > box.x && box.x + box.size > newBox.x;
      const isOverlappingY = newBox.y + newBox.size > box.y && box.y + box.size > newBox.y;

      if (isOverlappingX && isOverlappingY) {
        return true;
      }
    }
    return false;
  }*/

  toggleBox(box: Box) {
    if (this.selectedBox === box) {
      this.selectedBox = null;
    } else {
      this.selectedBox = box;
    }
    this.boxService.setSelectedBox(this.selectedBox);

    if (this.selectedBox) {
      // Update the URL with the selected box's coordinates
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { x: this.selectedBox.x, y: this.selectedBox.y },
        queryParamsHandling: 'merge',
      });
    } else {
      // Clear the coordinates from the URL
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: null,
        queryParamsHandling: 'merge',
      });
    }
  }
   private findBoxByCoordinates(x: number, y: number): Box | null {
    const boxes = this.boxService.getBoxes();
    for (const box of boxes) {
      if (box.x === x && box.y === y) {
        return box;
      }
    }
    return null;
  }
}
