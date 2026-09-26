import { Pedido } from "./Pedido";
import { Caja } from "./Caja";

export abstract class Descuento {
protected PorcentajeDescuento : number ;

constructor(PorcentajeDescuento: number){
    this.PorcentajeDescuento= PorcentajeDescuento;
}

public abstract esAplicable(condicion : Caja): boolean;

public CantidadDeDescuento(cantidad: number):number{
    return cantidad * this.PorcentajeDescuento/100;
}

public GetPorcentajeDescuento():number {return this.PorcentajeDescuento} ;

public AplicarDescuento(precio: number): number {
        return precio - (precio * this.PorcentajeDescuento / 100);
    }




}