import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDetails: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }
  username: string;
  password: string;
  ngOnInit() {
    this.StudentJson().subscribe(data => {
      this.loginDetails = data;
      console.log('login', data);
    })
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(20), Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastName: ['', [Validators.maxLength(20), Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      class: ['', [Validators.pattern('^[a-zA-Z0-9]{3,5}$')]],
      year: ['', [Validators.pattern('[0-9]+'), this.rangeValidator]],
      percentage: ['', Validators.pattern('[0-9]+')]
    });
  }
  StudentJson(): Observable<any> {
    return this.http.get('../../assets/students_List.json');
  }
  login(): void {
    if (this.loginForm.valid) {
      alert('Admission Is Sucessful');
    } else {
      alert('Please check the details you have entered!!!');
    }
  }
  rangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (Number(control.value) > 2017) {
        return { 'Range': true };
    }
    return null;
}
}
