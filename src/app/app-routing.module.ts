import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorComponent } from './components/dashboard/doctor/doctor.component';
import { ViewDoctorComponent } from './components/dashboard/doctor/view-doctor/view-doctor.component';
import { PatientComponent } from './components/dashboard/patient/patient.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ViewPatientComponent } from './components/dashboard/patient/view-patient/view-patient.component';
import { GuardGuard } from './shared/service/guard.guard';

const routes: Routes = [
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : 'dashboard', children :
  [
    {path : '', redirectTo: 'patient', pathMatch: 'full'},
    {path : 'patient', component: PatientComponent},
    {path : 'doctor', component: DoctorComponent},
    {path : 'doctor/:id', component: ViewDoctorComponent},
    {path : 'patient/:id', component: ViewPatientComponent},
  ], canActivate: [GuardGuard]},
  {path : 'login', component : LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
