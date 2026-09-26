import { Pedido } from "./Pedido"
import { MetodoDePago } from "./MetodoDePago";
import {Descuento} from "./Descuento" ;
import {DiaSemana, TipoDeMetodoDePago } from "./Enums";

export class Caja {
private Pedidos: Pedido ;
private MetodoDePago : MetodoDePago ;

constructor(Pedidos:Pedido, MetodoDePago: MetodoDePago){
    this.Pedidos= Pedidos;
    this.MetodoDePago= MetodoDePago ;
}

public CompetenciaDeDescuentos(descuento: Descuento [], precio: number) : number {

    let mejorPrecio: number = precio;

    for (const Descuento of descuento) {
        if ( /*this hace referencia a la instancia que se va a usar en el momento*/
            Descuento.esAplicable(this) &&
            Descuento.AplicarDescuento(precio) < mejorPrecio ) 
            { mejorPrecio = Descuento.AplicarDescuento(precio); } }

    return mejorPrecio;
}

public CobrarPrecioFinalConDescuento(descuentos: Descuento[]): number {

    const precio: number = this.Pedidos.calcularPrecioTotalPedidoSinDescuentos();

    return this.CompetenciaDeDescuentos(descuentos, precio);
}


public GetMetodoDePago() : TipoDeMetodoDePago {
    return this.MetodoDePago.GetTipoDeMetodoDePago() } ; 

public GetDiaPedido(): DiaSemana {
    return this.Pedidos.GetFechaPedido() }  ; 


}