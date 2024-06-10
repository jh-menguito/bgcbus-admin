import { Component, ViewChild} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud2';
  displayedColumns: string[] = ['Name', 'plateNum', 'Route', 'Email', 'Password', 'Action'];
  dataSource!: MatTableDataSource<any>;

  bgImage:string = "assets/bg1.png";
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  personalData: any[] = [];

  constructor(private dialog: MatDialog){

  }

  saveInfo(){
    localStorage.setItem('personalInfo', JSON.stringify(this.personalData));
    //this.cdr.detectChanges();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'45%',
    });
  }

 /* getAllInfo(){
    next:(res: any[] | undefined)=>{
    this.dataSource = new MatTableDataSource (this.personalData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.paginator.length = this.dataSource.data.length;
    }
  }*/

  editInfo( row: any){
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '45%',
      data: row
    });

  dialogRef.afterClosed().subscribe(result =>{
    if (result === 'saved'){
      //this.cdr.detectChanges();
      //this.getAllInfo();
    }
  })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

ngOnInit(){
  const savedData = localStorage.getItem ('personalInfo');
  //if (savedData){
    this.dataSource = new MatTableDataSource<any> (savedData? JSON.parse(savedData) : []);
  }

 /* else {
    this.personalData =[];
  }*/

deleteInfo(element: number){
  // debugger;
  const data = this.dataSource.data;
  data.splice (element, 1);
  this.dataSource.data = data;
  
  localStorage.setItem('personalInfo', JSON.stringify(this.dataSource.data));
  }
}  



  

