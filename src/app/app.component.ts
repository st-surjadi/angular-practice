import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, _MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private api: ApiService
  ) {

  }

  studentTableColumns = ['students', 'school_origin'];
  studentData = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {
    try {
      this.getAllStudents();
    } catch (error) {
      console.log(error);
    }
  }

  ngAfterViewInit() {
    this.studentData.paginator = this.paginator;
  }

  async getAllStudents() {
    try {
      const res = this.api.getAllStudent().subscribe(data => {
        this.studentData.data = data;
        this.studentData.data.forEach(e => {
          e.students = `${e.student_id.first_name} ${e.student_id.last_name}`;
          e.school_origin = e.school_origin_id.short_name;
        });
        console.log(this.studentData.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

}
