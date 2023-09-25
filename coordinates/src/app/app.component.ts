import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coordinates';
  isAddComponentVisible = false;
  showAddContainer = false;

  showAddComponent() {
    this.isAddComponentVisible = true;
  }

  hideAddComponent() {
    this.isAddComponentVisible = false;
  }
  toggleAddContainer() {
    this.showAddContainer = !this.showAddContainer;
  }
}
