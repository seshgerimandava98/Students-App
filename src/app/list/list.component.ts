import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { model } from '../login/model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  studentDetails: any = [];
  marks: any = [];
  constructor(private http: HttpClient) {
    this.jsonGet().subscribe(data => {
      this.studentDetails = data;
      this.studentDetails = this.studentDetails.sort(function(a, b){ // to sort in alpha order
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
      for (let i = 0; i < this.studentDetails.length; i++) {
        this.marks[i] = Number(this.studentDetails[i].marks.Maths) +
          Number(this.studentDetails[i].marks.English) + Number(this.studentDetails[i].marks.Science); // to calculate status of student
        this.studentDetails[i].name = this.studentDetails[i].name.charAt(0).toUpperCase() + this.studentDetails[i].name.slice(1); // to capitalize first letter
      }
    })
  }

  ngOnInit() {
  }

  jsonGet(): Observable<any> {
    return this.http.get<model>('../../assets/students_Info.json');
  }
  getColor(marks) {
    console.log('marks', marks);
    switch (marks) {
      case marks > 120:
        console.log('green');
        return 'green';
      case marks < 100:
        return 'red';
    }
  }
}
