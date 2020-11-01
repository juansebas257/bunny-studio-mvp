import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  id: number;
  title: string;
  form: FormGroup;
  isLoading: boolean = true;

  constructor(private userService: UserService, private fb: FormBuilder, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<UserFormComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id
  }

  ngOnInit() {
    // if the id is null, is a new user
    if (this.id == null) {
      this.title = "New user";
      this.isLoading = false;
    } else {
      this.title = "Update user"
      this.readUser();
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  readUser() {
    this.userService.get(this.id)
      .subscribe(
        result => {
          this.form.controls.name.setValue(result.name);
          this.isLoading = false;
        },
        error => {
          //TODO: handle error
          console.log(error);
        }
      )
  }

  save() {
    // stop here if form is invalid
    if (this.form.invalid || this.isLoading) {
      console.log(this.form)
      return;
    }

    this.isLoading = true;

    if (this.id == null) {
      this.userService.post(this.form.value)
        .subscribe(
          result => {
            this.dialogRef.close(result['insertId']);
            this.openSnackBar('User created!');
          },
          error => {
            // TODO: handle error
            this.openSnackBar('Error on create user!');
            this.isLoading = false;
          }
        );
    } else {
      this.userService.put(this.id, this.form.value)
        .subscribe(
          result => {
            this.dialogRef.close(this.id);
            this.openSnackBar('User updated!');
          },
          error => {
            // TODO: handle error
            this.openSnackBar('Error on update user!');
            this.isLoading = false;
          }
        );
    }
  }

  close() {
    this.dialogRef.close()
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
