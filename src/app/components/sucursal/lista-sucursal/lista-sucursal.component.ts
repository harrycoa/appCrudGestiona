import { SucursalService } from './../../../service/sucursal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Sucursal } from 'src/app/interfaces/sucursales.interface';
import { MatDialog } from '@angular/material/dialog';
import { SucursalComponent } from '../sucursal/sucursal.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-sucursal',
  templateUrl: './lista-sucursal.component.html',
  styleUrls: ['./lista-sucursal.component.scss']
})
export class ListaSucursalComponent implements OnInit {

  sucursal!: Sucursal

  sucursales: Sucursal[] = [];
  //dataSource: MatTableDataSource<Usuario>;
  
  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(
  private sucursalService: SucursalService,
  public dialog: MatDialog,
  private changeDetectorRefs: ChangeDetectorRef
  ) {  }
  


  ngOnInit(): void {
     this.cargar();
     
  }


 

  displayedColumns: string[] = ['id','cod_sucursal','nombre','actions'];
  dataSource = this.sucursales;


  cargar(){
    this.sucursalService.getAll()
        .subscribe( resp => {
          console.log(resp);
          //this.usuarios = resp;
          this.dataSource = resp;
          this.changeDetectorRefs.detectChanges();
        }); 
  }
  
  createE(){    
    let sucursal:Sucursal=null;   
    this.createElement(sucursal); 
  }
  
  createElement(element: Sucursal): void {
    const dialogRef = this.dialog.open(SucursalComponent,{
        width: '280px',
        data: element === null ? {
          id: null,
          cod_sucursal: '',
          nombre: ''         
        } : {
          id: element.id,
          cod_sucursal: element.cod_sucursal,
          nombre: element.nombre       
        }      
    });    

    dialogRef.afterClosed().subscribe(result => {
      console.log("fue cerrado");
      if  (result !== undefined){
        this.sucursalService.create(result)
        .subscribe(() => {
        this.cargar();
        });  
        
      }
    }); 
    
    
  }


  

  deleteElement(id: number): void{
    this.dataSource = this.dataSource.filter(p=> p.id !== id);

    console.log(id);
    this.sucursalService.delete(id)
      .subscribe(resp => {
        this.cargar();
      });

  }

  editElement(element: Sucursal): void{
    this.createElement(element);
  }  

}
