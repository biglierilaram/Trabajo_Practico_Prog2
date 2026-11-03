import { DiaSemana, EstadoItem, EstadoPedido } from "./Enums";
import { Item } from "./Item";

export abstract class Pedido {
    private static readonly itemNoEncontrado: number = -1;
    private static readonly cantidadItemsAEliminar: number = 1;

    protected idPedido: number;
    private diaDePedido: DiaSemana;
    private productosFinales: Item[];
    private estado: EstadoPedido;

    public constructor(idPedido: number, diaDePedido: DiaSemana) {
        this.idPedido = idPedido;
        this.diaDePedido = diaDePedido;
        this.productosFinales = [];
        this.estado = EstadoPedido.EN_CONSTRUCCION;
    }

    public calcularPrecioTotalPedidoSinDescuentos(): number {
        let precioTotal: number = 0;

        for (const item of this.productosFinales) {
            precioTotal += item.precioFinal();
        }

        return precioTotal;
    }

    public agregarItems(item: Item): void {
        this.validarEnConstruccion();
        this.productosFinales.push(item);
    }

    public getItems(): Item[] {
        return [...this.productosFinales];
    }

    public quitarItem(item: Item): void {
        this.validarEnConstruccion();

        const indice: number = this.productosFinales.indexOf(item);

        if (indice === Pedido.itemNoEncontrado) {
            return;
        }

        if (item.getEstado() !== EstadoItem.PENDIENTE) {
            throw new Error(
                "No se puede quitar un ítem que comenzó su preparación."
            );
        }

        this.productosFinales.splice(
            indice,
            Pedido.cantidadItemsAEliminar
        );
    }

    public confirmar(): void {
        this.validarEnConstruccion();

        if (this.productosFinales.length === 0) {
            throw new Error(
                "No se puede confirmar un pedido sin ítems."
            );
        }

        this.estado = EstadoPedido.CONFIRMADO;
    }

    public estaConfirmado(): boolean {
        return this.estado === EstadoPedido.CONFIRMADO;
    }

    public estanTodosLosItemsListos(): boolean {
        return (
            this.productosFinales.length > 0 &&
            this.productosFinales.every(
                (item: Item) => item.getEstado() === EstadoItem.LISTO
            )
        );
    }

    public getFechaPedido(): DiaSemana {
        return this.diaDePedido;
    }

    private validarEnConstruccion(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error(
                "No se puede modificar un pedido que ya fue confirmado."
            );
        }
    }
}