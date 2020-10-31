import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.css']
})
export class CardsContainerComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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
}
