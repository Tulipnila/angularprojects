import { Pipe, PipeTransform } from '@angular/core';

interface Box {
  x: number;
  y: number;
}

@Pipe({
  name: 'boxCoordinates'
})
export class BoxCoordinatesPipe implements PipeTransform {

  transform(box: Box): string {
    return `${box.x}, ${box.y}`;
  }

}
