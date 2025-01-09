import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profileForm = this.fb.group({
      name: [data.name, [Validators.required, Validators.maxLength(50)]],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: [data.address],
      bio: [data.bio, [Validators.maxLength(200)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
