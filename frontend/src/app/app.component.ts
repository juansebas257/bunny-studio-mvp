import { Component } from '@angular/core';
import { FrameService } from './services/frame.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string;
  showBack: boolean = false

  constructor(private frameService: FrameService) {
    // Subscribed Behaviors
    this.frameService.navBarTitle.subscribe(updatedTitle => {
      this.title = updatedTitle;
    });
    this.frameService.showBack.subscribe(updatedSubmenu => {
      this.showBack = updatedSubmenu;
    });
    // End Subscribed Behaviors
  }
}
