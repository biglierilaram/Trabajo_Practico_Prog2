import { Articulo } from "./Articulo";
import { Item } from "./Item";
import { PrecioCombo } from "./PrecioCombo";

export class Combo extends Item {
private precioCombo: PrecioCombo;
private articulos : Articulo[];
public constructor(
    nombre: string,
    idItem: number,
    precioCombo: PrecioCombo) {
    super(nombre,idItem);
    this.precioCombo =precioCombo;
    this.articulos=[];

}

public agregarArticulos(articulo:Articulo):void {
this.articulos.push(articulo);
}

public precioFinal(): number {
return this.precioCombo.calcularPrecio(this.articulos) 
}

public getArticulos():Articulo[] {
    return this.articulos;
}
}

