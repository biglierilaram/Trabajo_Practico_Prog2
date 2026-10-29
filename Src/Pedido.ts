import { DiaSemana } from "./Enums";
import { Item } from "./Item";

export class Pedido {
    private static readonly itemNoEncontrado: number = -1;
    private static readonly cantidadItemsAEliminar: number = 1;

    protected idPedido: number;
    private diaDePedido: DiaSemana;
    private productosFinales: Item[];

    public constructor(idPedido: number, diaDePedido: DiaSemana) {
        this.idPedido = idPedido;
        this.diaDePedido = diaDePedido;
        this.productosFinales = [];
    }

    public calcularPrecioTotalPedidoSinDescuentos(): number {
        let precioTotal: number = 0;

        for (const item of this.productosFinales) {
            precioTotal += item.precioFinal();
        }

        return precioTotal;
    }

    public agregarItems(item: Item): void {
        this.productosFinales.push(item);
    }

    public quitarItem(item: Item): void {
        const indice: number = this.productosFinales.indexOf(item);

        if (indice !== Pedido.itemNoEncontrado) {
            this.productosFinales.splice(
                indice,
                Pedido.cantidadItemsAEliminar
            );
        }
    }

    public getFechaPedido(): DiaSemana {
        return this.diaDePedido;
    }
}