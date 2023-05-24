import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DataserviceService } from 'src/app/shared/service/dataservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Doctor } from 'src/app/shared/model/doctor';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDoctorComponent } from './delete-doctor/delete-doctor.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  constructor(private dialog: MatDialog, private dataApi: DataserviceService, private snackBar: MatSnackBar){}
  
  doctorsArr: any[] = [];

  displayedColumns: string[] = ['name','mobile','email','department','gender','action'];
  dataSource !: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngOnInit(){
    this.getAllDoctors();
  }


  
//add doctor
  addDoctor(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Add Doctor',
      buttonName: 'Register'

    }   
    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataApi.addDoctor(data);
        this.openSnackBar("Registraion Sucessfull", "Ok");
      }
    })

  }

  //delete doctor

  deleteDoctor(row :any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete Doctor',
      doctorName: row.name
    }   
    const dialogRef = this.dialog.open(DeleteDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataApi.deleteDoctor(row.id);
        this.openSnackBar("Successfully deleted doctor", "Ok");
      }
    })

  }

  // edit doctor

  editDoctor(row: any){
    if(row.id==null || row.name==null){
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit Docor";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.birthDate = row.birthDate.toDate();

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataApi.updateDoctor(data);
        this.openSnackBar("Updated Successfully", "Ok");
      }
    })

  }

  // view doctor
  viewDoctor(row: any){
    window.open('/dashboard/doctor/'+row.id,'_blank');
  }

  getAllDoctors(){
    this.dataApi.getAllDoctors().subscribe(res =>{
      this.doctorsArr = res.map((e: any) =>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.doctorsArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
} 
