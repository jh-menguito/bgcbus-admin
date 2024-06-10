import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

  personalForm !:FormGroup;
  personalData!: any[];
  actionBtn : string = "Save";
  editedIndex: any;
  dataSource: any;
  maxDate?: string;

  constructor(private formBuilder : FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent> ){ 
      const today = new Date();
      this.maxDate = today.toISOString().split('T')[0]; //future dates cannot be selected
     }

  ngOnInit(): void {
    this.personalForm = this.formBuilder.group({

      Name: ['', Validators.required],
      plateNum: ['', Validators.required],
      Route: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]], //domainValidator()
      Password: ['', [Validators.required, Validators.pattern('[0-9]{10}')]], //must be 11 digit numbers
   })
  

  const savedData = localStorage.getItem ('personalInfo');
  if (savedData){
    this.personalData = JSON.parse(savedData);
  }

  else {
    this.personalData =[]; //creates an empty array to store future data
  }

  if (this.editData) {
    this.actionBtn = "Update";
    this.personalForm.controls['Name'].setValue(this.editData.Name);
    this.personalForm.controls['plateNum'].setValue(this.editData.Gender);
    this.personalForm.controls['Route'].setValue(this.editData.Route);
    this.personalForm.controls['Email'].setValue(this.editData.Email);
    this.personalForm.controls['Password'].setValue(this.editData.Password);
  }
}


  addInfo(){
    if(!this.personalForm.valid){
      alert('please fill out all the required fields');
      return;
    }

    if (this.editData){
      const updatedData = this.personalForm.value
      const index = this.personalData.findIndex((item: any) => item.Name === this.editData.Name)

      if (index !== -1){
       this.personalData[index] = updatedData;
      } else { //item is nowhere to be found
       alert ('no data to be updated');
       return;
      }
     }

      else{
   
       this.personalData.push(this.personalForm.value);
      }
     localStorage.setItem('personalInfo', JSON.stringify(this.personalData));
     // Store updated personal data in local storage
     this.personalForm.reset();  
     this.dialogRef.close('saved');
    // this.cdr.detectChanges();
     setTimeout(() => {
       window.location.reload();
     }, 100); //automatically reloads the page if save or update button is clicked
     }
    }
    

