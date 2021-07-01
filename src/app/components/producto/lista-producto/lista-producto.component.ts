import { ProductoService } from './../../../service/producto.service';
import { Producto } from './../../../interfaces/producto.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  //dataSource: MatTableDataSource<Usuario>;
  
  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(
  private productoService: ProductoService,
  public dialog: MatDialog) { }
  


  ngOnInit(): void {
     this.productoService.getAll()
        .subscribe( resp => {
          console.log(resp);
          this.dataSource = resp;

        }); 
  }
  displayedColumns: string[] = ['id','cod_producto', 'nombre', 'precio', 'actions'];
  dataSource = this.productos;
  

  createE(){    
    let producto:Producto=null;   
    this.createElement(producto); 
  }
  

  createElement(element: Producto | null): void {
    const dialogRef = this.dialog.open(ProductoComponent,{
        width: '280px',
        data: element === null ? {
          id: null,
          cod_producto: '',
          nombre: '',
          precio: null          
        } : {
          id: element.id,
          cod_producto: element.cod_producto,
          nombre: element.nombre,
          precio: element.precio        
        }
      
    });

    //this.usuarioService.createUser(this.usuario)

    dialogRef.afterClosed().subscribe(result => {
      console.log("fue cerrado");
      if  (result !== undefined){



        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
        
        this.productoService.create(result)
            .subscribe(() => {
              console.log("Producto guardado con exito");
            });

      }
    });
  }



  
  deleteElement(id: number): void{
    this.dataSource = this.dataSource.filter(p=> p.id !== id);

    console.log(id);
    this.productoService.delete(id)
      .subscribe(resp => {
        console.log(resp);
      });

  }

  editElement(element: Producto): void{
    this.createElement(element);
  }

}
