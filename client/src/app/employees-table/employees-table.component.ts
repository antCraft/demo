import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeeService } from '../_services/employee/employee.service';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { DepartmentService } from '../_services/department/department.service';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit {

  employee = new FormGroup({
     empName: new FormControl('', [Validators.required]),
     empActive: new FormControl(),
     empDepartment: new FormControl('', [Validators.required])

      });

  employeeTab = new FormGroup({

     empName: new FormControl([Validators.required]),
     empActive: new FormControl(),
     empDepartment: new FormControl([Validators.required])

  });


  departments;
  employees;
  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, public dialog: MatDialog ) { }

  displayedColumns: string[] = ['view', 'edit', 'id', 'name', 'status', 'department', 'delete'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


   openEditDialog(emp): void {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '250px',
      data: {empName: emp.empName, empActive: emp.empActive, empDepartment: emp.empDepartment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result.empDepartment);
      this.edit(emp, result);
      }
    });
  }

  openViewDialog(emp): void {
    this.dialog.open(ViewDialog, {
      width: '250px',
      data: {empName: emp.empName, empActive: emp.empActive, empDepartment: emp.empDepartment }
    });
  }

  resetForm() {
    this.employee.reset();
    Object.keys(this.employee.controls).forEach(key => {
          this.employee.controls[key].setErrors(null);
        });
  }

  ngOnInit() {
    this.employeeService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
    });
  }


  save(form: NgForm) {
    this.employeeService.save(form).subscribe(result => {
      this.resetForm();
    this.ngOnInit();
    }, error => console.error(error));

  }

  edit(employee, form) {
    this.employeeService.edit(employee, form).subscribe(result => {
       this.ngOnInit();
    }, error => console.error(error));
  }

  remove(href) {
    this.employeeService.remove(href).subscribe(result => {
       this.ngOnInit();
    }, error => console.error(error));

  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class EditDialog implements OnInit {


  departments;
  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,

    public departmentService: DepartmentService) {}


  ngOnInit(): void {
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'view-dialog',
  templateUrl: 'view-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ViewDialog implements OnInit {


  departments;
  constructor(
    public dialogRef: MatDialogRef<ViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,

    public departmentService: DepartmentService) {}


  ngOnInit(): void {
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export interface Employee {
  empName: string;
  empDepartment: string;
  empActive: string;
}


