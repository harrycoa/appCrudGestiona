import { UsuarioService } from './../../../service/usuario.service';
import { Usuario } from './../../../interfaces/usuarios.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UsuarioComponent } from '../usuario/usuario.component';


@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss']
})

export class ListaUsuarioComponent implements OnInit {
  //usuario: Usuario = ;
  usuarios: Usuario[] = [];
  //dataSource: MatTableDataSource<Usuario>;
  
  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(
  private usuarioService: UsuarioService,
  public dialog: MatDialog) { }
  


  ngOnInit(): void {
     this.usuarioService.getUsers()
        .subscribe( resp => {
          console.log(resp);
          //this.usuarios = resp;
          this.dataSource = resp;

        }); 
  }
  displayedColumns: string[] = ['id','cod_usuario', 'nombre', 'usuario', 'password', 'sucursal','actions'];
  dataSource = this.usuarios;
  

  createE(){    
    let usuario:Usuario=null;   
    this.createElement(usuario); 
  }

  createElement(element: Usuario | null): void {
    const dialogRef = this.dialog.open(UsuarioComponent,{
        width: '280px',
        data: element === null ? {
          id: null,
          cod_usuario: '',
          nombre: '',
          usuario: '',
          password: '',
          sucursal_id: ''
        } : {
          id: element.id,
          cod_usuario: element.cod_usuario,
          nombre: element.nombre,
          usuario: element.usuario,
          password: element.password,
          sucursal_id: element.sucursal_id
        }
      
    });

    //this.usuarioService.createUser(this.usuario)

    dialogRef.afterClosed().subscribe(result => {
      console.log("fue cerrado");
      if  (result !== undefined){


        // comentar
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
        // antiguo
        this.usuarioService.createUser(result)
        .subscribe(() => {
        console.log("exito");
        });  

      }
    });
  }

  deleteElement(id: number): void{
    this.dataSource = this.dataSource.filter(p=> p.id !== id);

    console.log(id);
    this.usuarioService.deleteUser(id)
      .subscribe(resp => {
        console.log(resp);
      });

  }

  editElement(element: Usuario): void{
    this.createElement(element);
  }

}
