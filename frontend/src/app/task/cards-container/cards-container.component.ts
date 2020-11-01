import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.css']
})
export class CardsContainerComponent implements OnInit {

  @Input() user_id: string;
  @Input() status: string
  isLoading: boolean = true;
  totalItemCount: number = 0;
  tasks: any = [];

  constructor(private dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit(): void {
    this.readTasks();
  }

  readTasks() {
    this.isLoading = true;
    //this.userService.getAll((this.paginator.pageIndex + 1).toString(), this.sort.active, this.sort.direction)
    this.taskService.getAll(this.user_id, this.status)
      .subscribe(
        result => {
          this.tasks = result.data;
          this.totalItemCount = result.totalItemCount;
          this.isLoading = false;
        },
        error => {
          //TODO: handle error
          this.isLoading = false
        }
      )
  }

  openModal(id: number = null) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      id,
      user: this.user_id
    };

    const dialogRef = this.dialog.open(TaskFormComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != '') {
        this.readTasks();
      }
    });
  }
}
