import {Inject, Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.css']
})
export class DeleteDoctorComponent {
  doctorName!: string;
  title!: string;

  constructor(
    
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DeleteDoctorComponent>
  ){
    this.doctorName = data.doctorName,
    this.title = data.title;

  }

  delete(){
    const deleteDoctor = true;
    this.dialogRef.close(deleteDoctor);

  }

  closed(){
    this.dialogRef.close();
  }

}
