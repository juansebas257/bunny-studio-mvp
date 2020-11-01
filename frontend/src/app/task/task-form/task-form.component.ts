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
      user: new FormControl(this.user)
    });
  }

  readTask() {
    this.taskService.get(this.id)
      .subscribe(
        result => {
          this.form.controls.name.setValue(result.name);
          this.isLoading = false;
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
            //this.notifier.notify('success', 'Se ha creado el cliente correctamente')
          },
          error => {
            //this.notifier.notify('error', 'Error al guardar el cliente ' + error.message)
            this.isLoading = false;
          }
        );
    } else {
      this.taskService.put(this.id, this.form.value)
        .subscribe(
          result => {
            this.dialogRef.close(this.id);
            //this.notifier.notify('info', 'Se ha modificado el cliente correctamente')
          },
          error => {
            //console.log(error)
            //this.notifier.notify('error', 'Error al guardar el cliente ' + error.message)
            this.isLoading = false;
          }
        );
    }
  }

  close() {
    this.dialogRef.close()
  }

}