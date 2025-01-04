import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public user: any) {}

  ngOnInit(): void {}
}

