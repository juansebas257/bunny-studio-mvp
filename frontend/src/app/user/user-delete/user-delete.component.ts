import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  id: number;

  constructor(private userService: UserService, private dialogRef: MatDialogRef<UserDeleteComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data.id;
  }

  ngOnInit() {
  }

  delete() {
    this.userService.delete(this.id)
      .subscribe(
        result => {
          this.dialogRef.close('refreshlist');
        },
        error => {
          // TODO: handle error
          this.dialogRef.close();
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

}
