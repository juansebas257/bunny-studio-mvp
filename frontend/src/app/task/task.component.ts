import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  selected_submenu: string = 'pending';
  
  constructor() { }

  ngOnInit(): void {
  }

}
