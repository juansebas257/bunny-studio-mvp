import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FrameService {
  navBarTitle = new BehaviorSubject('GearPos')
  selectedMenu = new BehaviorSubject('')

  setNavBar(name: string) {
    this.navBarTitle.next(name)
  }

  setSelectedMenu(item: string) {
    this.selectedMenu.next(item)
  }
}
