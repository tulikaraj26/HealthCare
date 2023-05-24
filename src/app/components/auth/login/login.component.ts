import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form !: FormGroup;
  email: any = '';
  password: any = '';

  ngOnInit(){
    
  }


  constructor(
    private authApi: AuthService,
    private fb: FormBuilder,
    private route: Router
  )    
    {
      this.form = this.fb.group({
        email: [this.email,[Validators.required, Validators.email]],
        password: [this.password,[Validators.required]],
        
      })
  }

  login(){
    this.authApi.login(this.form.value.email, this.form.value.password);
  }
}
