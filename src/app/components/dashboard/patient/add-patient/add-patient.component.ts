import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/model/doctor';
import { DataserviceService } from 'src/app/shared/service/dataservice.service';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {

  form !: FormGroup;
  title !: string;
  patient_id !: string;
  patient_name !: string;
  mobile !: string;  
  gender !: string;
  doctor_id !: string;
  doctor_name !: string
  admission_date !: Date;
  prescription !: string;
  buttonName !: string;

  allDoctors : any[] = [];

  dataSource !: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;



  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dataApi: DataserviceService,

    private dialogRef: MatDialogRef<AddPatientComponent>
  ){
    this.title = data.title;
    this.patient_id= data.patient_id;
    this.patient_name = data.patient_name;
    this.mobile = data.mobile;
    this.gender = data.gender;
    this.admission_date = data.admission_date;
    this.prescription = data.prescription;
    this.buttonName = data.buttonName;
    this.doctor_id = data.doctor_id;
    this.doctor_name = data.doctor_name;
  }

  ngOnInit(){
    this.getAllDoctors();
    this.form = this.fb.group({
      patient_id: [this.patient_id, []],
      patient_name : [this.patient_name, [Validators.required]],
      mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gender : [this.gender, [Validators.required]],
      doctor_id : [this.doctor_id, [Validators.required]],
      doctor_name : [this.doctor_name, []],
      admission_date : [this.admission_date, [Validators.required]],
      prescription : [this.prescription, [Validators.required]]
    })

  }

  cancelRegistration(){

    this.dialogRef.close();
  }
  async registerPatient(){
    this.form.value.doctor_name = await this.getDoctorsName(this.form.value.id);
    this.dialogRef.close(this.form.value);
  }
  
  getAllDoctors(){
    this.dataApi.getAllDoctors().subscribe(res =>{
      this.allDoctors = res.map((e: any) =>{
        const data = e.payload.doc.data();
        const doctor = {
          doctor_name : data.name,       
          doctor_id : e.payload.doc.id
        }
        return doctor;
      })

      this.dataSource = new MatTableDataSource(this.allDoctors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

    getDoctorsName(doctorId : string){
      for(let i=0;i<this.allDoctors.length;i++){
        if(this.allDoctors[i].doctor_id == doctorId){
          return this.allDoctors[i].doctor_name;
        }
      }
      return "";
    }
  }

