//import { PeriodicElement } from './../lista-usuario/lista-usuario.component';
import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuarios.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  element!: Usuario;

  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    public dialogRef: MatDialogRef<UsuarioComponent>
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
