import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  element!: Producto;

  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    public dialogRef: MatDialogRef<ProductoComponent>
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
