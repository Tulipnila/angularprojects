import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { BoxCoordinatesPipe } from './pipe/box-coordinates.pipe';
import { BoxService } from './box.service';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { BoxInfoComponent } from './box-info/box-info.component'; // Import the BoxInfoComponent

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    BoxCoordinatesPipe,
    AddComponent,
    BoxInfoComponent, 
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [BoxService],
  bootstrap: [AppComponent],
})
export class AppModule {}
