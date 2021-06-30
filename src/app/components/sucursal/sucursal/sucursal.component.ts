import { Sucursal } from './../../../interfaces/sucursales.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})
export class SucursalComponent implements OnInit {
  element!: Sucursal;

  isChange!: boolean;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Sucursal,
    public dialogRef: MatDialogRef<SucursalComponent>
    ) {}

  
  ngOnInit(): void {
    if(this.data.id != null){
      this.isChange = true;
    } else {
      this.isChange = false;
    }

  }
  
  onCancel(): void{
    this.dialogRef.close();
  }

}
