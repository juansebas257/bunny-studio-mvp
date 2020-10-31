import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FrameService } from '../services/frame.service';
import { UserService } from '../services/user.service';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['picture', 'name', 'created_at', 'updated_at', 'actions'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoading: boolean = true;
  totalItemCount: number = 0;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable() {
    this.isLoading = true;
    //this.userService.getAll((this.paginator.pageIndex + 1).toString(), this.sort.active, this.sort.direction)
    this.userService.getAll()
      .subscribe(
        result => {
          this.dataSource = result.data;
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
    dialogConfig.data = {
      id
    };

    const dialogRef = this.dialog.open(UserFormComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != '') {
        this.updateTable();
      }
    });
  }

  confirmDelete(id: number) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id
    };

    const dialogRef = this.dialog.open(UserDeleteComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refreshlist') {
        this.updateTable();
      }
    });
  }

}
