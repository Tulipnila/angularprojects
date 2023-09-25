import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface Box {
  x: number;
  y: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private selectedBoxSubject = new BehaviorSubject<Box | null>(null);
  public selectedBox$: Observable<Box | null> = this.selectedBoxSubject.asObservable();

  private highlightedBoxSubject = new BehaviorSubject<Box | null>(null);
  public highlightedBox$: Observable<Box | null> = this.highlightedBoxSubject.asObservable();

  private boxesSubject = new BehaviorSubject<Box[]>([]);
  public boxes$ = this.boxesSubject.asObservable();

  constructor(private router: Router) {
    const defaultBoxes: Box[] = [
      { x:50, y: 50, size: 10 },
      { x:100, y: 150, size: 10 },
      { x:200, y: 100, size: 10 },
      { x:300, y: 200, size: 10 },
      { x:250, y: 300, size: 10 }
    ];
    this.boxesSubject.next(defaultBoxes);
  }
  addBoxes(box: Box) {
    const boxes = this.boxesSubject.getValue();
    boxes.push(box);
    this.boxesSubject.next(boxes);
  }

  deleteBox(box: Box) {
    const boxes = this.boxesSubject.getValue().filter(b => b !== box);
    this.boxesSubject.next(boxes);
  }

  getBoxes(): Box[] {
    return this.boxesSubject.getValue();
  }
  setSelectedBox(box: Box | null) {
    this.selectedBoxSubject.next(box);
    if(box) {
      this.router.navigate([], {
        queryParams:{x: box.x, y: box.y },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], { queryParams: null });
    }
  }

  getSelectedBox(): Observable<Box | null> {
    return this.selectedBoxSubject.asObservable();
  }

  toggleBoxHighlight(box: Box) {
    const highlightedBox = this.highlightedBoxSubject.getValue();
    if (highlightedBox === box) {
      this.highlightedBoxSubject.next(null);
    } else {
      this.highlightedBoxSubject.next(box);
    }
  }

}
