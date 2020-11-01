import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  id: number;
  user: string;
  state: string = '1';
  title: string;
  form: FormGroup;
  isLoading: boolean = true;

  constructor(private taskService: TaskService, private fb: FormBuilder, private dialogRef: MatDialogRef<TaskFormComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.id = data.id
    this.user = data.user
  }

  ngOnInit() {
    // if the id is null, is a new task
    if (this.id == null) {
      this.title = "New task";
      this.isLoading = false;
    } else {
      this.title = "Update task"
      this.readTask();
    }

    this.form = new FormGroup({
      description: new FormControl(null, Validators.required),
      state: new FormControl(this.state),
      user: new FormControl(this.user)
    });
  }

  readTask() {
    this.taskService.get(this.id)
      .subscribe(
        result => {
          this.form.controls.description.setValue(result.description);
          this.form.controls.state.setValue(result.state);
          this.isLoading = false;

          this.state = result.state;
        },
        error => {
          //TODO: handle error
          //console.log(error);
        }
      )
  }

  save() {
    // stop here if form is invalid
    if (this.form.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    if (this.id == null) {
      this.taskService.post(this.form.value)
        .subscribe(
          result => {
            this.dialogRef.close(result['insertId']);
            // TODO: notify
          },
          error => {
            // TODO: handle error
            this.isLoading = false;
          }
        );
    } else {
      this.taskService.put(this.id, this.form.value)
        .subscribe(
          result => {
            this.dialogRef.close(this.id);
            // TODO: notify
          },
          error => {
            // TODO: handle error
            this.isLoading = false;
          }
        );
    }
  }

  close() {
    this.dialogRef.close()
  }

  updateState(state: string) {
    this.form.controls.state.setValue(state);
    this.save();
  }

}