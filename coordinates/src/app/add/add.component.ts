import { Component, EventEmitter, Output } from '@angular/core';
import { BoxService, Box } from '../box.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Output() close = new EventEmitter<void>();
  xCoordinate: number = 0;
  yCoordinate: number = 0;
  isBoxCreated: boolean = false;

  constructor(private boxService: BoxService, private location: Location) {}

  createBox() {
    const newBox: Box = {
      x: this.xCoordinate,
      y: this.yCoordinate,
      size: 10 // You can set the size of the box here (adjust as needed)
    };

    this.location.go(`/x/${this.xCoordinate}/y/${this.yCoordinate}`);
    this.boxService.addBoxes(newBox);
    this.close.emit();
    this.isBoxCreated = true;
  }
  cancel() {
    this.close.emit();
  }
}
