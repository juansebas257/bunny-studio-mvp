import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FrameService {
  navBarTitle = new BehaviorSubject('')
  selectedMenu = new BehaviorSubject('')
  showBack = new BehaviorSubject(false)

  setNavBar(name: string) {
    this.navBarTitle.next(name);
  }

  setSelectedMenu(item: string) {
    this.selectedMenu.next(item);
  }

  setShowBack(show: boolean) {
    this.showBack.next(show);
  }
}
