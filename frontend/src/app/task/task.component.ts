import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrameService } from '../services/frame.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  user_id: string;
  selected_submenu: string = '1'; // show tasks pending by default

  constructor(private frameService: FrameService, private activatedRoute: ActivatedRoute) {
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user');
    this.frameService.setNavBar("User's Tasks");
    this.frameService.setShowBack(true);
  }

  ngOnInit(): void {
  }

}
