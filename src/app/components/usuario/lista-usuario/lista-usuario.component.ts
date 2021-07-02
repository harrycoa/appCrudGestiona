import { UsuarioService } from './../../../service/usuario.service';
import { Usuario } from './../../../interfaces/usuarios.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UsuarioComponent } from '../usuario/usuario.component';
import { Sucursal } from 'src/app/interfaces/sucursales.interface';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss'],
})
export class ListaUsuarioComponent implements OnInit {
  //usuario: Usuario = ;
  usuarios: Usuario[] = [];
  //dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargar();
  }


  cargar(){
    this.usuarioService.getUsers().subscribe((resp) => {
      console.log(resp);
      this.dataSource = resp;
    });
  }

  displayedColumns: string[] = [
    'id',
    'cod_usuario',
    'nombre',
    'usuario',
    'password',
    'sucursal',
    'actions',
  ];
  dataSource = this.usuarios;

  createE() {
    let usuario: Usuario = null;
    this.createElement(usuario);
  }

  createElement(element: Usuario | null): void {
    let sucursal: Sucursal = {
      id: null,
      cod_sucursal: null,
      nombre: null,
    };
    if (element && element.sucursal && element.sucursal.id) {
      sucursal = {
        id: element.sucursal.id,
        cod_sucursal: element.sucursal.cod_sucursal,
        nombre: element.sucursal.nombre,
      };
    }
    const dialogRef = this.dialog.open(UsuarioComponent, {
      width: '280px',
      data:
        element === null
          ? {
              id: null,
              cod_usuario: '',
              nombre: '',
              usuario: '',
              password: '',
              sucursal,
            }
          : {
              id: element.id,
              cod_usuario: element.cod_usuario,
              nombre: element.nombre,
              usuario: element.usuario,
              password: element.password,
              sucursal,
            },
    });

    //this.usuarioService.createUser(this.usuario)

    dialogRef.afterClosed().subscribe((result) => {
      console.log('fue cerrado');
      if (result !== undefined) {
       
        this.usuarioService.createUser(result).subscribe(() => {
          this.cargar();
        });
      }
    });
  }

  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter((p) => p.id !== id);

    console.log(id);
    this.usuarioService.deleteUser(id).subscribe((resp) => {
      console.log(resp);
    });
  }

  editElement(element: Usuario): void {
    this.createElement(element);
  }
}
