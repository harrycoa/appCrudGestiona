import { Sucursal } from "./sucursales.interface";

export interface Usuario {
    id: number;
    cod_usuario: string;
    nombre: string;
    usuario: string;
    password: string;
    sucursal: Sucursal;
}