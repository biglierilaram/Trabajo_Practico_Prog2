import { Categoria, TipoDeEstacion } from "./Enums";
import {Item} from "./Item"

export class Articulo extends Item {
private precioArticulo : number;
private categoria : Categoria; 
private estacion: TipoDeEstacion;

public constructor(
    nombre: string,
    idItem: number,
    precioArticulo: number,
    categoria: Categoria,
    estacion: TipoDeEstacion) {
    super(nombre,idItem);
    this.precioArticulo = precioArticulo;
    this.categoria = categoria;
    this.estacion = estacion;
}

public precioFinal(): number {
return this.precioArticulo;
}

public getEstacion(): TipoDeEstacion {
return this.estacion;
}
}