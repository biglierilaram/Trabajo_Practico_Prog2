import { DiaSemana } from "./Enums";
import { Item } from "./Item";


export class Pedido {
protected IdPedido : number ;
private DiaDePedido : DiaSemana ;
private ProductosFinales: Item[] ;

constructor(IdPedido:number, DiaDePedido: DiaSemana){
    this.IdPedido = IdPedido;
    this.DiaDePedido= DiaDePedido;
    this.ProductosFinales= []
}

public calcularPrecioTotalPedidoSinDescuentos(): number {
    let precioTotal: number = 0;

    for (const item of this.ProductosFinales) {
        precioTotal += item.precioFinal();
    }

    return precioTotal;
}


public AgregarItems(item: Item) : void {
    this.ProductosFinales.push(item);
};

public QuitarITem(item: Item) : void {}; //falta desarrollar

public GetFechaPedido () : DiaSemana { return this.DiaDePedido};


}